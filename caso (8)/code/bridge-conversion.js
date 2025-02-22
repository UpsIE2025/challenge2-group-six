require('dotenv').config();
const { Kafka } = require('kafkajs');
const amqp = require('amqplib');
const { sendNotifications } = require('./notifications');

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC;
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const RABBITMQ_QUEUE = `${KAFKA_TOPIC}_json`; // Nombre dinámico basado en Kafka

async function consumeKafkaAndSendToRabbitMQ() {
    try {
        // Conectar a Kafka
        const kafka = new Kafka({ brokers: [KAFKA_BROKER] });
        const consumer = kafka.consumer({ groupId: 'bridge-group' });

        console.log('Conectando a Kafka...');
        await consumer.connect();
        await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });
        console.log(`Suscrito a Kafka topic: ${KAFKA_TOPIC}`);

        // Conectar a RabbitMQ
        console.log('Conectando a RabbitMQ...');
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(RABBITMQ_QUEUE, { durable: true });
        console.log(`Cola RabbitMQ lista: ${RABBITMQ_QUEUE}`);

        // Consumir mensajes de Kafka y enviarlos a RabbitMQ con conversión a JSON
        await consumer.run({
            eachMessage: async ({ message }) => {
                const rawContent = message.value.toString();

                // Convertir texto a JSON
                const jsonMessage = {
                    timestamp: new Date().toISOString(),
                    originalText: rawContent,
                    length: rawContent.length,
                };

                const jsonBuffer = Buffer.from(JSON.stringify(jsonMessage));

                // Mostrar en consola el mensaje enviado
                console.log('Mensaje recibido de Kafka:');
                console.log(`Origen: ${rawContent}`);
                console.log(`JSON: ${JSON.stringify(jsonMessage)}`);

                // Enviar JSON a RabbitMQ
                channel.sendToQueue(RABBITMQ_QUEUE, jsonBuffer);
                await sendNotifications(jsonMessage);
                console.log(`Enviado a RabbitMQ (cola: ${RABBITMQ_QUEUE}):`);
                console.log(` Origen: ${rawContent}`);
                console.log(` JSON: ${JSON.stringify(jsonMessage)}`);
            },
        });
    } catch (error) {
        console.error('Error en el puente de mensajería:', error);
    }
}

consumeKafkaAndSendToRabbitMQ();
