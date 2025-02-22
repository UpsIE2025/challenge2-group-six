Historia de Usuario:

    COMO desarrollador de integración,
    QUIERO utilizar un mensaje de documento para transferir de forma fiable una estructura de datos entre aplicaciones,
    PARA que el receptor decida cómo procesar la información recibida, asegurando flexibilidad y fiabilidad en la comunicación.

Criterios de Aceptación:

    DADO que una aplicación necesita enviar una estructura de datos,
    CUANDO se cree y envíe un mensaje de documento,
    ENTONCES el mensaje deberá contener una única unidad de datos, objeto o estructura de datos que pueda descomponerse si es necesario.

    DADO que una aplicación recibe un mensaje de documento,
    CUANDO el mensaje sea recibido correctamente,
    ENTONCES el receptor podrá decidir cómo procesar, almacenar o descomponer los datos según sus necesidades.

    DADO un mensaje de documento con una estructura de datos,
    CUANDO se transfiera entre aplicaciones,
    ENTONCES la transferencia deberá ser fiable, garantizando la integridad y completitud de los datos.

Ejecucion

    Clonar el repositorio
    Abrir y ejecutar el proyecto "kafka-producer" en intelliJ on un ide similar que permita ejecutar aplicaciones java
    Abrir y ejecutar el proyecto "kafka-consumer" en intelliJ on un ide similar que permita ejecutar aplicaciones java

Testing

    Abrir Postman e importar el json KafkaTopics.postman_collection.json; o,
    Enviar una petición POST al endpoint: http://localhost:8090/api/kafka/send y 2 Parámetros con sus valores: "topic"
    y "message". Para topic existen 3 valores válidos: query, price, purchase.