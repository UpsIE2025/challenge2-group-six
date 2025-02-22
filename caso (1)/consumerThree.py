from flask import Flask, request, jsonify
from kafka import KafkaConsumer
import json

app = Flask(__name__)

def main():
    consumer = KafkaConsumer('telegrafo',bootstrap_servers='209.94.59.49:29092',
            group_id='grupo_receptores1',  #
            auto_offset_reset='earliest')  
    for message in consumer:
        print(message.value.decode('utf-8'))


if __name__ == '__main__':
    main()
