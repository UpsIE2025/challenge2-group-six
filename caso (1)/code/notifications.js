require('dotenv').config();
const { Kafka } = require('kafkajs');
const amqp = require('amqplib');

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const KAFKA_NOTIFICATIONS_TOPIC = "notificaciones"; // Topic de notificaciones en Kafka
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const RABBITMQ_NOTIFICATIONS_QUEUE = "notificaciones"; // Cola de notificaciones en RabbitMQ

async function sendNotifications(originalMessage) {
    try {
        // Conectar a Kafka
        const kafka = new Kafka({ brokers: [KAFKA_BROKER] });
        const producer = kafka.producer();
        await producer.connect();
        console.log(`Conectado a Kafka para enviar notificaciones en topic: ${KAFKA_NOTIFICATIONS_TOPIC}`);

        // Conectar a RabbitMQ
        console.log('Conectando a RabbitMQ para enviar notificaciones...');
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(RABBITMQ_NOTIFICATIONS_QUEUE, { durable: true });
        console.log(`Cola de notificaciones en RabbitMQ lista: ${RABBITMQ_NOTIFICATIONS_QUEUE}`);

        // Crear mensaje de notificación
        const notificationMessage = {
            timestamp: new Date().toISOString(),
            status: "Mensaje recibido",
            originalMessage,
        };

        // Enviar a Kafka
        await producer.send({
            topic: KAFKA_NOTIFICATIONS_TOPIC,
            messages: [{ value: JSON.stringify(notificationMessage) }],
        });
        console.log(`Notificación enviada a Kafka: ${JSON.stringify(notificationMessage)}`);

        // Enviar a RabbitMQ
        channel.sendToQueue(RABBITMQ_NOTIFICATIONS_QUEUE, Buffer.from(JSON.stringify(notificationMessage)));
        console.log(`Notificación enviada a RabbitMQ: ${JSON.stringify(notificationMessage)}`);

        // Cerrar conexiones
        await producer.disconnect();
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error al enviar notificación:', error);
    }
}

module.exports = { sendNotifications };
