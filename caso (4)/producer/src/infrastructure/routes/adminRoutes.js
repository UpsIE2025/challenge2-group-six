const express = require('express');
const AdminController = require('../controllers/adminController');

const setAdminRoutes = (app) => {
    const router = express.Router();
    const adminController = new AdminController();

    router.get('/failed-messages', adminController.getFailedMessages);

    app.use('/api/admin', router);
};

module.exports = setAdminRoutes;