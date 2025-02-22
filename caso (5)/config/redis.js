const redis = require("redis");

const client = redis.createClient({
  host: "209.94.59.49", // dirección servidor remoto
  port: 6380, // puerto de Redis
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = client;
