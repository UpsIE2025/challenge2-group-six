const { Kafka } = require('kafkajs');
const kafkaConfig = require('../config/kafkaConfig');
const { pushToDeadLetterQueue } = require('../redis/redisService');

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
        console.log(`📤 Mensaje enviado al tópico ${topic}`);
    } catch (error) {
        console.error(`❌ Error al enviar mensaje al tópico ${topic}:`, error);
        await pushToDeadLetterQueue({ topic, message, error: error.message, timestamp: new Date() });
    } finally {
        await producer.disconnect();
    }
};

module.exports = {
    sendMessage
};