# Message Channel / Invalid Message

# Historia de Usuario

COMO un administrador del sistema,  
QUIERO que los mensajes no entregados en Kafka se almacenen en una cola de Dead Letter en Redis,  
PARA garantizar la trazabilidad y recuperación de mensajes fallidos.

## Criterios de Aceptación

- **DADO** un mensaje en Kafka que no puede ser entregado,
- **CUANDO** el mensaje supere el número máximo de intentos de reenvío,
- **ENTONCES** debe ser movido a una cola de Dead Letter en Redis con información del error y metadatos del mensaje.

- **DADO** un mensaje almacenado en la cola de Dead Letter,
- **CUANDO** un administrador del sistema consulte los mensajes fallidos,
- **ENTONCES** se debe mostrar el contenido del mensaje, el origen del error y la máquina que intentó procesarlo.

## Requisitos Previos

1. **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
2. **Kafka**: Asegúrate de tener una instancia de Kafka en funcionamiento. Puedes seguir la [documentación oficial de Kafka](https://kafka.apache.org/quickstart) para configurarlo.
3. **Redis**: Asegúrate de tener una instancia de Redis en funcionamiento. Puedes seguir la [documentación oficial de Redis](https://redis.io/download) para configurarlo.
4. **Postman**: Asegúrate de tener Postman instalado para probar las APIs. Puedes descargarlo desde [postman.com](https://www.postman.com/downloads/).

## Configuración

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/grupo-6-2025/challenge2.git
   cd challenge2/caso (4)
   ```
2. **Ejecutar producer**
   ```sh
   cd .\producer\
   npm install
   npm start
   ```
3. **Ejecutar consumer**
   ```sh
   cd .\consumer\
   npm install
   npm start
   ```

## Probar con Postman

1. **Importar la colección de Postman**:

   - Abre Postman.
   - Haz clic en "Import" en la esquina superior izquierda.
   - Selecciona "Upload Files" y carga el archivo `CASO 4.postman_collection.json` ubicado en `D:/MAESTRIA/PATRONES DE INTEGRACION EMPRESARIAL/RETOS/challenge2/caso (4)/`.

2. **Enviar un mensaje**:

   - En Postman, selecciona la colección "CASO 4".
   - Selecciona la petición "send-message".
   - Asegúrate de que la URL sea `http://localhost:3000/api/messages`.
   - Haz clic en "Send" para enviar el mensaje.

3. **Obtener mensajes fallidos**:
   - En Postman, selecciona la petición "get-failed-messages".
   - Asegúrate de que la URL sea `http://localhost:3000/api/failed-messages`.
   - Haz clic en "Send" para obtener los mensajes fallidos.

## Notas

- Asegúrate de que las instancias de Kafka y Redis estén en funcionamiento antes de ejecutar el productor y el consumidor.
- Revisa los logs para cualquier error y asegúrate de que las configuraciones de conexión sean correctas.

Con estos pasos, deberías poder ejecutar tanto el productor como el consumidor y probar las funcionalidades utilizando Postman.

```

Asegúrate de que las variables de entorno estén configuradas correctamente en el archivo `.env` y que el archivo `CASO 4.postman_collection.json` esté importado en Postman para realizar las pruebas.
Asegúrate de que las variables de entorno estén configuradas correctamente en el archivo `.env` y que el archivo `CASO 4.postman_collection.json` esté importado en Postman para realizar las pruebas.
```
