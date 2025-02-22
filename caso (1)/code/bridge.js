require('dotenv').config();
const { Kafka } = require('kafkajs');
const amqp = require('amqplib');
const { sendNotifications } = require('./notifications');

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC;
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE;

async function consumeKafkaAndSendToRabbitMQ() {
    try {
        // Conectar a Kafka
        const kafka = new Kafka({ brokers: [KAFKA_BROKER] });
        const consumer = kafka.consumer({ groupId: 'bridge-group' });

        console.log('📡 Conectando a Kafka...');
        await consumer.connect();
        await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });
        console.log(`Suscrito a Kafka topic: ${KAFKA_TOPIC}`);

        // Conectar a RabbitMQ
        console.log('Conectando a RabbitMQ...');
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(RABBITMQ_QUEUE, { durable: true });
        console.log(`Cola RabbitMQ lista: ${RABBITMQ_QUEUE}`);

        // Consumir mensajes de Kafka y enviarlos a RabbitMQ
        await consumer.run({
            eachMessage: async ({ message }) => {
                const content = message.value.toString();
                console.log(`Recibido de Kafka: ${content}`);

                // Enviar mensaje a RabbitMQ
                channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(content));
                console.log(`Enviado a RabbitMQ: ${content}`);
                await sendNotifications(jsonMessage);
            },
        });
    } catch (error) {
        console.error('Error en el puente de mensajería:', error);
    }
}

consumeKafkaAndSendToRabbitMQ();
