const { getDeadLetterMessages } = require('../redis/redisService');

class AdminController {
    async getFailedMessages(req, res) {
        try {
            const messages = await getDeadLetterMessages();
            res.status(200).json({ success: true, messages });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener los mensajes fallidos', error: error.message });
        }
    }
}

module.exports = AdminController;