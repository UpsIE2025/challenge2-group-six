from flask import Flask, request, jsonify
from kafka import KafkaProducer
import json
from kafka.errors import KafkaError

app = Flask(__name__)

producer =KafkaProducer(bootstrap_servers='209.94.59.49:29092')#cambiara kafka

@app.route('/kafka', methods=['POST'])
def kafka():
    data = request.get_json()
    print(data)
    try:
        future = producer.send('telegrafo', data['message'].encode('utf-8'))
        record_metadata = future.get(timeout=10)  
        response = {"status": "Mensaje enviado", "partition": record_metadata.partition}
    except KafkaError as e:
        response = {"status": "Error", "error": str(e)}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
