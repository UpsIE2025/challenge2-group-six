Historia de Usuario: COMO un administrador del sistema,
QUIERO que los mensajes no entregados en Kafka se almacenen en una cola de Dead Letter en Redis,
PARA garantizar la trazabilidad y recuperación de mensajes fallidos.

Criterios de Aceptación:

DADO un mensaje en Kafka que no puede ser entregado,

CUANDO el mensaje supere el número máximo de intentos de reenvío,

ENTONCES debe ser movido a una cola de Dead Letter en Redis con información del error y metadatos del mensaje.

DADO un mensaje almacenado en la cola de Dead Letter,

CUANDO un administrador del sistema consulte los mensajes fallidos,

ENTONCES se debe mostrar el contenido del mensaje, el origen del error y la máquina que intentó procesarlo.
