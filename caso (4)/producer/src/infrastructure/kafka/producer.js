const { Kafka } = require('kafkajs');
const kafkaConfig = require('../config/kafkaConfig');

const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers
});

const producer = kafka.producer();

const sendMessage = async ({ topic, message }) => {
    try {
        await producer.connect();
        const result = await producer.send({
            topic: topic,
            messages: [{ value: message }]
        });
        console.log('📤 Mensaje enviado');
        // console.log('📤 Mensaje enviado:', message, 'Resultado:', result);
    } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
    } finally {
        await producer.disconnect();
    }
};

module.exports = {
    sendMessage
};