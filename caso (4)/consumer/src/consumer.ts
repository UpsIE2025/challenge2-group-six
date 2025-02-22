// src/consumer.ts
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID!,
  brokers: [process.env.KAFKA_BROKER!],
});

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC!,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📩 Mensaje recibido: ${message.value?.toString()}`);
    },
  });
};

// Ejecutar el consumidor
run().catch(console.error);
