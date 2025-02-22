User Story

    COMO desarrollador de integración,
    QUIERO usar un canal de tipo de datos separado para cada tipo de datos,
    PARA asegurar que todos los datos en un canal específico sean del mismo tipo y facilitar su
    correcta identificación y procesamiento.

Criterios de Aceptación:

    DADO que necesito enviar un conjunto de datos,
    CUANDO seleccione el canal correspondiente al tipo de datos,
    ENTONCES el sistema deberá garantizar que solo se transmitan datos de ese tipo a través de dicho canal.

    DADO que recibo datos a través de un canal específico,
    CUANDO el sistema identifique el canal de recepción,
    ENTONCES deberá reconocer automáticamente el tipo de datos asociado a ese canal.

    DADO que se configura un nuevo canal de comunicación,
    CUANDO se le asigne un tipo de datos,
    ENTONCES solo deberá aceptar y transmitir datos de ese tipo, rechazando cualquier otro.

Ejecucion

    Clonar el repositorio
    Abrir y ejecutar el proyecto "kafka-producer" en intelliJ on un ide similar que permita ejecutar aplicaciones java
    Abrir y ejecutar el proyecto "kafka-consumer" en intelliJ on un ide similar que permita ejecutar aplicaciones java

Testing

    Abrir Postman e importar el json KafkaTopics.postman_collection.json; o,
    Enviar una petición POST al endpoint: http://localhost:8090/api/kafka/send y 2 Parámetros con sus valores: "topic"
    y "message". Para topic existen 3 valores válidos: query, price, purchase.