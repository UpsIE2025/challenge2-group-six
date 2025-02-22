from flask import Flask, request, jsonify
from kafka import KafkaProducer
from kafka import KafkaConsumer
import json
import redis

app = Flask(__name__)

# Configuración de Kafka
KAFKA_BROKER = 'localhost:9092'
#KAFKA_BROKER = '209.94.59.49:9092'
TOPIC_NAME = 'guaranteed_delivery_topic'
#TOPIC_NAME = 'telegrafo'

# Configuración de Redis
REDIS_HOST = 'localhost'
#REDIS_HOST = '209.94.59.49'
REDIS_PORT = 6379
#REDIS_PORT = 6380
REDIS_DB = 0

# Inicialización del productor
sender = KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Inicialización del consumidor
receiver = KafkaConsumer(
    TOPIC_NAME,
    bootstrap_servers=KAFKA_BROKER,
    #group_id='guaranteed-delivery-group',
    group_id='telegrafo-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8')),
    auto_offset_reset='latest',
    enable_auto_commit=True
)

# Crear un cliente de Redis
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

@app.route('/send', methods=['POST'])
def send_message():
    # Recibe un mensaje a través de POST y lo envía a Kafka
    # Enviar mensaje a Kafka y esperar confirmación (ack)
    message = request.json.get('message')
    if message:
        try:
            #Identificador unico 
            message_id = r.incr('message_id')  

            # Guardamos el mensaje en Redis 
            r.set(f'message:{message_id}', json.dumps({'message': message}))
            
            # Enviamos el mensaje a Kafka
            sender.send(TOPIC_NAME, {'message': message,'message_id':message_id}).get(timeout=30)
            sender.flush()
           
            return jsonify({'status': 'Message sent','message':message, 'id':message_id}), 200
        except Exception as e:
            return jsonify({'status': 'Message not sent','message':message}), 500
    return jsonify({'status': 'No message provided'}), 400

@app.route('/receive', methods=['GET'])
def receive_message():
    msg = receiver.poll(timeout_ms=1000)
    if not msg:
        return jsonify({"message": "No hay mensajes disponibles"}), 404
        
    for partition, messages in msg.items():

        for message in messages:
            message_id = message.value['message_id'] 
            message_content = message.value['message']  
            
            # Guardar el mensaje en Redis 
            r.set(f'message:{message_id}', json.dumps({'message': message_content}))
            return jsonify({'message': message_content,'message_id':message_id}), 200

    return jsonify({"message": "No hay mensajes disponibles"}), 404
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
