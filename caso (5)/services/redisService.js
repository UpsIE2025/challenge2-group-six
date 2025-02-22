const redisClient = require("../config/redis");

const getFailedMessages = async () => {
  return new Promise((resolve, reject) => {
    redisClient.lrange("dead-letter-queue", 0, -1, (err, messages) => {
      if (err) reject(err);
      resolve(messages.map((msg) => JSON.parse(msg)));
    });
  });
};

const retryFailedMessage = async (message) => {
  const { originalMessage } = message;
  const kafkaService = require("./kafkaService");
  await kafkaService.sendMessage("original-topic", JSON.parse(originalMessage));
};

module.exports = { getFailedMessages, retryFailedMessage };
