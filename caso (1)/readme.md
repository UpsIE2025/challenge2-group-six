# Kafka con Flask
Historia de Usuario
Título: Enviar y recibir mensajes a través de un canal punto a punto

Como un desarrollador de sistemas de mensajería,
Quiero enviar mensajes desde un productor y asegurarme de que solo un receptor lo consuma,
Para garantizar la entrega única y evitar que múltiples receptores procesen el mismo mensaje.

Este proyecto implementa un sistema de mensajería basado en Kafka y Flask. Contiene:
- Un **productor** para enviar mensajes a Kafka.
- Dos **consumidores** que lee mensajes desde Kafka.
- Soporte para múltiples consumidores dentro de un mismo grupo.

---

## 📌 Requisitos

- Python 3.8 o superior
- Kafka
- Librerías necesarias en `requirements.txt`

---

## 🚀 Instalación y Configuración

### 1️⃣ Crear un entorno virtual
```sh
python -m venv .venv
source .venv/bin/activate  
.venv\Scripts\activate    
```

### 2️⃣ Instalar dependencias
```sh
pip install -r requirements.txt
```

---

## 📡 Ejecutar el sistema

### 🏭 Iniciar el productor (API Flask)
```sh
python producerOne_kafka.py
```

### 🎧 Iniciar los consumidores (receptores)
Puedes ejecutar múltiples consumidores:
```sh
python consumerOne.py
python consumerTwo_kafka.py
python consumerThree.py
```
O iniciar dos consumidores en diferentes terminales:
```sh
python consumerOne.py &  # Consumidor 1
python consumerTwo_kafka.py  #Consumidor 2
python consumerThree.py #Consumidor 2
```

---

## 📝 Enviar un mensaje de prueba
Usa `curl` para enviar un mensaje al productor:
```sh
curl --location 'http://127.0.0.1:3000/kafka' \
--header 'Content-Type: application/json' \
--data '{
    "message": "Hola",
    "id": 123,
    "timestamp": "2025-02-22T12:00:00Z"
}'
```
