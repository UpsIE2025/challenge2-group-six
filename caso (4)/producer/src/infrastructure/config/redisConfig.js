const dotenv = require('dotenv');

dotenv.config();

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORTs
};

module.exports = redisConfig;