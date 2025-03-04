const CHANNEL_ADAPTER = 7; // Valor del Channel Adapter
const { Kafka } = require("kafkajs"); // Importar Kafka desde kafkajs

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["209.94.59.49:29092"], // Dirección del servidor remoto
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: `my-group-${CHANNEL_ADAPTER}` }); // Usar el Channel Adapter

module.exports = { producer, consumer, CHANNEL_ADAPTER };
