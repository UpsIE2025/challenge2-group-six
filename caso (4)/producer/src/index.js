const express = require('express');
const setMessageRoutes = require('./infrastructure/routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setMessageRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});