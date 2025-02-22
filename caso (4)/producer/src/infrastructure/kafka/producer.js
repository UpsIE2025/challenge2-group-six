const { Kafka } = require('kafkajs');
const kafkaConfig = require('../config/kafkaConfig');
const { pushToDeadLetterQueue } = require('../redis/redisService');

const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers
});

const producer = kafka.producer();
let kafkaAvailable = false;

const checkKafkaAvailability = async () => {
    try {
        await producer.connect();
        kafkaAvailable = true;
        console.log('✅ Kafka está disponible.');
    } catch (error) {
        console.error('❌ Kafka no está disponible:', error.message);
        kafkaAvailable = false;
    } finally {
        await producer.disconnect();
    }
};

const sendMessage = async ({ topic, message }) => {
    if (!kafkaAvailable) {
        console.error('❌ Kafka no disponible. Guardando en la cola de mensajes fallidos.');
        await pushToDeadLetterQueue({ topic, message, error: 'Kafka no disponible', timestamp: new Date() });
        return;
    }

    try {
        await producer.connect();
        await producer.send({
            topic: topic,
            messages: [{ value: message }]
        });
        console.log(`📤 Mensaje enviado al tópico ${topic}`);
    } catch (error) {
        console.error(`❌ Error al enviar mensaje al tópico ${topic}:`, error.message);
        await pushToDeadLetterQueue({ topic, message, error: error.message, timestamp: new Date() });
    } finally {
        await producer.disconnect();
    }
};

// Ejecutar la verificación de Kafka al iniciar
checkKafkaAvailability();

module.exports = {
    sendMessage
};
