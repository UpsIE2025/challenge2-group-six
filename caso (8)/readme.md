# 📨 Bridge de Mensajería entre Kafka y RabbitMQ

Este proyecto implementa un **puente de mensajería** entre Kafka y RabbitMQ usando **Node.js**.  
Se reciben mensajes en **texto plano** desde un topic en Kafka, se convierten a **JSON** y se reenvían a una cola en RabbitMQ.  
Además, se envían **notificaciones de confirmación** a ambos sistemas.
---
## Historia de Usuario: Puente de Mensajería

### 🎯 **Historia de Usuario**
**COMO** arquitecto de integración  
**QUIERO** implementar un puente de mensajería entre dos sistemas de mensajería diferentes  
**PARA** garantizar la interoperabilidad y la transmisión eficiente de mensajes entre ellos  

### ✅ **Criterios de Aceptación**
- **DADO** que existen dos sistemas de mensajería con protocolos distintos,  
  **CUANDO** se envíe un mensaje desde un sistema,  
  **ENTONCES** el puente de mensajería lo transformará y entregará correctamente al otro sistema.  
- **DADO** que el mensaje puede contener distintos formatos de datos,  
  **CUANDO** pase a través del puente de mensajería,  
  **ENTONCES** se adaptará para ser comprendido por el sistema destino.  
- **DADO** que pueden ocurrir errores de transmisión,  
  **CUANDO** un mensaje no pueda ser entregado,  
  **ENTONCES** el sistema generará una alerta para su corrección.  

---

#### 🌍**Caso: Integración entre una tienda en línea y un sistema bancario**
Una tienda en línea utiliza un sistema de mensajería basado en Kafka para procesar órdenes de compra. Sin embargo, su proveedor bancario utiliza RabbitMQ para la autorización de pagos. Para garantizar que los mensajes de confirmación de compra lleguen correctamente al banco y viceversa, se implementa un **puente de mensajería** que traduce los mensajes de Kafka a RabbitMQ y viceversa.  

✅ *Resultado:* La tienda puede confirmar los pagos en tiempo real y el banco recibe correctamente las solicitudes sin necesidad de cambiar su infraestructura.

---

## 🚀 **Requisitos**
Antes de comenzar, asegúrate de tener instalado:
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## 🛠 **Configuración del Proyecto**
### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/UpsIE2025/challenge2-group-six.git
cd tu_repositorio/code
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno
Crea un archivo `.env` en `code/` con:
```env
KAFKA_BROKER=209.94.59.49:29092
KAFKA_TOPIC=telegrafo
RABBITMQ_URL=amqp://admin:admin@209.94.59.49
RABBITMQ_QUEUE=telegrafo_json
```

---

## 🏗 **Levantando Kafka y RabbitMQ**
### 1️⃣ Levantar **Kafka** (en su propio directorio)
```bash
cd kafka
docker-compose up -d
```

### 2️⃣ Levantar **RabbitMQ** (en su propio directorio)
```bash
cd ../rabbitmq
docker-compose up -d
```

> 📌 La interfaz de RabbitMQ estará disponible en:  
> **[http://209.94.59.49:15672](http://209.94.59.49:15672)**  
> Usuario: `admin`  
> Contraseña: `admin`

---

## ▶️ **Ejecutar el Puente de Mensajería**
Corre el siguiente comando dentro de la carpeta `code/`:
```bash
node bridge.js
```
Esto hará que los mensajes recibidos en **Kafka** sean enviados a **RabbitMQ** en formato JSON.

---

## 📢 **Notificaciones de Recepción**
El sistema genera **confirmaciones** cada vez que un mensaje es recibido.  
Para ello, ejecuta:
```bash
node notifications.js
```
Esto enviará notificaciones a **Kafka** y **RabbitMQ** en la cola `notificaciones`.

---

## 🔍 **Ejemplo de Flujo de Datos**
1️⃣ **Kafka** recibe un mensaje en texto plano:
```
"Hola, este es un mensaje de prueba."
```
2️⃣ **El puente convierte y envía a RabbitMQ como JSON:**
```json
{
    "timestamp": "2025-02-22T18:00:00.000Z",
    "originalText": "Hola, este es un mensaje de prueba.",
    "length": 35
}
```
3️⃣ **Se envía una notificación de recepción:**
```json
{
    "timestamp": "2025-02-22T18:00:05.000Z",
    "status": "Mensaje recibido",
    "originalMessage": {
        "timestamp": "2025-02-22T18:00:00.000Z",
        "originalText": "Hola, este es un mensaje de prueba.",
        "length": 35
    }
}
```

---

## 🔧 **Comandos Útiles**
| Acción | Comando |
|--------|---------|
| Instalar dependencias | `npm install` |
| Iniciar puente de mensajería | `node bridge.js` |
| Iniciar servicio de notificaciones | `node notifications.js` |
| Ver logs de RabbitMQ | `docker logs -f rabbitmq` |
| Ver logs de Kafka | `docker logs -f kafka` |
| Detener RabbitMQ | `docker-compose down` |
| Detener Kafka | `docker-compose down` |

---

## 📝 **Notas Finales**
- Este sistema facilita la interoperabilidad entre **Kafka** y **RabbitMQ**.
- Se pueden agregar más validaciones o transformaciones de datos según necesidades.
- Para escalar, se pueden usar **Docker Swarm** o **Kubernetes**.

> 💡 *¡Listo! Ahora tienes un puente de mensajería funcional entre Kafka y RabbitMQ.* 🚀