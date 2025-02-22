const producer = require('../../infrastructure/kafka/producer')
const Message = require('../../domain/entities/message');
const kafkaConfig = require('../../infrastructure/config/kafkaConfig');
const MessageTypes = require('../../infrastructure/config/messageTypes');

class SendMessageUseCase {
    async execute({ topic = kafkaConfig.topic, message }) {
        if (!message || typeof message !== MessageTypes.STRING) {
            throw new Error('El contenido del mensaje debe ser una cadena no vacía.');
        }
        const msg = new Message({
            id: 'msg-' + Math.random().toString(36).substr(2, 9),
            content: message,
            type: MessageTypes.STRING
        });
        await producer.sendMessage({ topic: topic, message: JSON.stringify(msg) });
    };
}




module.exports = SendMessageUseCase;