const producer = require('../../infrastructure/kafka/producer')
const Message = require('../../domain/entities/message');
const kafkaConfig = require('../../infrastructure/config/kafkaConfig');
const MessageTypes = require('../../infrastructure/config/messageTypes');

class SendMessageUseCase {
    async execute(topic = kafkaConfig.topic, content) {
        console.log(content)
        if (!content || typeof content !== MessageTypes.STRING) {
            throw new Error('El contenido del mensaje debe ser una cadena no vacía.');
        }
        const message = new Message({
            id: 'msg-' + Math.random().toString(36).substr(2, 9),
            content: content,
            type: MessageTypes.STRING
        });
        await producer.sendMessage({ topic: topic, message: JSON.stringify(message) });
    };
}




module.exports = SendMessageUseCase;