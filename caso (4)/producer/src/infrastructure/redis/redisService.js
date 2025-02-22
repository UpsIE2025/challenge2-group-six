const Redis = require('ioredis');
const redisConfig = require('../config/redisConfig');

let isRedisAvailable = false;

// Función para crear un cliente Redis
const createRedisClient = () => {
    const client = new Redis({
        host: redisConfig.host || process.env.REDIS_HOST || 'redis',
        port: redisConfig.port || process.env.REDIS_PORT || 6379,
        retryStrategy: (times) => Math.min(times * 100, 3000), // Espera exponencial en caso de fallo
    });

    // Eventos de conexión y error
    client.on('connect', () => {
        console.log('✅ Conexión exitosa a Redis');
        isRedisAvailable = true;
    });

    client.on('error', (error) => {
        console.error(`❌ Error en la conexión de Redis: ${error.message}`);
        isRedisAvailable = false;
    });

    client.on('close', () => {
        console.warn('⚠️ Redis se ha desconectado');
        isRedisAvailable = false;
    });

    client.on('reconnecting', () => {
        console.log('♻️ Intentando reconectar a Redis...');
        isRedisAvailable = false;
    });

    return client;
};

const client = createRedisClient();

// Verificación periódica de disponibilidad de Redis
const checkRedisAvailability = async () => {
    try {
        await client.ping();
        if (!isRedisAvailable) {
            console.log('✅ Redis está disponible nuevamente');
            isRedisAvailable = true;
        }
    } catch (error) {
        if (isRedisAvailable) {
            console.error('❌ Redis ya no está disponible:', error.message);
            isRedisAvailable = false;
        }
    }
};
setInterval(checkRedisAvailability, 5000);

// Función para enviar mensajes a la Dead Letter Queue
const pushToDeadLetterQueue = async (message) => {
    try {
        await client.call('LPUSH', 'dead_letter_queue', JSON.stringify(message));
        console.log('📥 Mensaje agregado a la Dead Letter Queue');
    } catch (error) {
        console.error('❌ Error al agregar mensaje a la Dead Letter Queue:', error.message);
    }
};

// Función para obtener mensajes de la Dead Letter Queue
const getDeadLetterMessages = async () => {
    try {
        const messages = await client.call('LRANGE', 'dead_letter_queue', 0, -1);
        return messages.map(msg => JSON.parse(msg));
    } catch (error) {
        console.error('❌ Error al obtener mensajes de la Dead Letter Queue:', error.message);
        return [];
    }
};

// Función para cerrar la conexión de Redis
const closeRedisConnection = async () => {
    try {
        await client.quit();
        console.log('🔌 Conexión a Redis cerrada correctamente');
    } catch (error) {
        console.error('❌ Error al cerrar la conexión de Redis:', error.message);
    }
};

module.exports = {
    pushToDeadLetterQueue,
    getDeadLetterMessages,
    closeRedisConnection,
};
