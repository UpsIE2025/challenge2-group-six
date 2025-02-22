Historia de Usuario Técnica
COMO desarrollador de backend
QUIERO implementar un canal de mensajes fallidos (Dead Letter Queue) utilizando Kafka y Redis en un sistema de mensajería basado en Node.js
PARA asegurar la resiliencia del sistema y permitir la recuperación de mensajes no procesados correctamente

Criterios de Aceptación
DADO un mensaje que no puede ser procesado exitosamente en Kafka,
CUANDO el sistema detecta el fallo después de un número configurable de intentos,
ENTONCES el mensaje debe ser redirigido a una cola de mensajes fallidos en Redis con metadatos del error.

DADO un mensaje almacenado en la cola de mensajes fallidos en Redis,
CUANDO un proceso de reintento es activado manualmente o por una política de reintentos,
ENTONCES el mensaje debe ser reintroducido en la cola original de Kafka para su reprocesamiento.

DADO un mensaje que ha sido enviado a la cola de mensajes fallidos,
CUANDO se registre el error,
ENTONCES se debe almacenar información del fallo, como la máquina que lo procesó, el timestamp y el motivo del error.

DADO que un mensaje ha sido movido a la cola de mensajes fallidos,
CUANDO el sistema de monitoreo consulte el estado,
ENTONCES debe ser posible obtener estadísticas sobre los mensajes fallidos y su distribución por causa del error.

Consideraciones Técnicas
Kafka se encargará de la gestión de los mensajes en tiempo real.
Redis actuará como almacenamiento temporal de mensajes fallidos.
El API en Node.js manejará la lógica de reenvío y monitoreo de los mensajes fallidos.
Se implementará un mecanismo de reintentos configurable para minimizar la pérdida de mensajes.