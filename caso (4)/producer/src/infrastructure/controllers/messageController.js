const SendMessageUseCase = require('../../application/use-cases/sendMessageUseCase');

class MessageController {
    constructor() {
        this.sendMessageUseCase = new SendMessageUseCase();
        this.sendMessage = this.sendMessage.bind(this);
    }

    async sendMessage(req, res) {
        const { message } = req.body;
        try {
            await this.sendMessageUseCase.execute({ message: message });
            res.status(200).json({ success: true, message: '📤 Mensaje enviado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al enviar el mensaje', error: error.message });
        }
    }
}

module.exports = MessageController;