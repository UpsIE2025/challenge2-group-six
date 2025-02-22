const { producer, consumer } = require("../config/kafka");

const sendMessage = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};

const consumeMessages = async (topic, handler) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        await handler(JSON.parse(message.value.toString()));
      } catch (error) {
        console.error("Error processing message:", error);
        await handleFailedMessage(message, error);
      }
    },
  });
};

const handleFailedMessage = async (message, error) => {
  const failedMessage = {
    originalMessage: message.value.toString(),
    error: error.message,
    timestamp: new Date().toISOString(),
    machine: process.env.HOSTNAME || "localhost",
  };

  const redisClient = require("../config/redis");
  redisClient.lpush("dead-letter-queue", JSON.stringify(failedMessage));
};

module.exports = { sendMessage, consumeMessages };
