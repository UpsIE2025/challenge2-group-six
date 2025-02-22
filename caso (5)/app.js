const express = require("express");
const kafkaService = require("./services/kafkaService");
const redisService = require("./services/redisService");
//const { processMessage } = require("./handlers/messageHandler");
//const retry = require("./utils/retryPolicy");

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint para enviar mensajes a Kafka
app.post("/send-message", async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }

  try {
    await kafkaService.sendMessage(topic, message);
    res.status(200).json({ success: true, message: "Message sent to Kafka" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send message to Kafka",
      details: error.message,
    });
  }
});

// Endpoint para obtener mensajes fallidos de Redis
app.get("/failed-messages", async (req, res) => {
  try {
    const failedMessages = await redisService.getFailedMessages();
    res.status(200).json({ success: true, failedMessages });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve failed messages",
      details: error.message,
    });
  }
});

// Endpoint para reintentar un mensaje fallido
app.post("/retry-failed-message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    await redisService.retryFailedMessage(message);
    res.status(200).json({ success: true, message: "Failed message retried" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retry message", details: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
