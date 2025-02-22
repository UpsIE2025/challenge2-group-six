const express = require('express');
const setMessageRoutes = require('./infrastructure/routes/messageRoutes');
const setAdminRoutes = require('./infrastructure/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setMessageRoutes(app);
setAdminRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});