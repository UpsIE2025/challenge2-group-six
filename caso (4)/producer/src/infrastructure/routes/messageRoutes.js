const express = require('express');
const MessageController = require('../controllers/messageController');

const setMessageRoutes = (app) => {
    const router = express.Router();
    const messageController = new MessageController();

    router.post('/messages', messageController.sendMessage);

    app.use('/api', router);
};

module.exports = setMessageRoutes;