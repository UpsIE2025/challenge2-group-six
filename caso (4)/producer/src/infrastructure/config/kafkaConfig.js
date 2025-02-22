const dotenv = require('dotenv');

dotenv.config();

const kafkaConfig = {
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER],
    topic: process.env.KAFKA_TOPIC
};

module.exports = kafkaConfig;