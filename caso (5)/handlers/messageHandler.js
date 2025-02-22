const processMessage = async (message) => {
  // Simula el procesamiento del mensaje
  if (message.shouldFail) {
    throw new Error("Failed to process message");
  }
  console.log("Message processed successfully:", message);
};

module.exports = { processMessage };
