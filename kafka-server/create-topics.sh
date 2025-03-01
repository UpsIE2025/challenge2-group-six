#!/bin/bash

# Esperar a que Kafka se inicie completamente
sleep 10

# Lista de topics a crear
TOPICS=("telegrafo" "mensajes" "notificaciones" "query" "price" "purchase" "original-topic")

# Crear cada topic si no existe
for TOPIC in "${TOPICS[@]}"; do
  kafka-topics.sh --create \
    --bootstrap-server kafka:9092 \
    --replication-factor 1 \
    --partitions 3 \
    --topic "$TOPIC"

  echo "Topic '$TOPIC' creado correctamente."
done