// kafka.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './redis.service';
import config from '../configuracion/kafka';
import { Kafka, Producer } from 'kafkajs'

// Asumiendo que RedisService está en este path

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka  
  private producer: Producer;
  private kafkaAvailable = false;

  constructor(private redisService: RedisService) {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit(): Promise<void> {
    await this.checkKafkaAvailability();
  }

  private async checkKafkaAvailability(): Promise<void> {
    try {
      await this.producer.connect();
      this.kafkaAvailable = true;
      console.log('✅ Kafka está disponible.');
    } catch (error) {
      console.error('❌ Kafka no está disponible:', error.message);
      this.kafkaAvailable = false;
    } finally {
      await this.producer.disconnect();
    }
  }

  async sendMessage({ topic, message }: { topic: string; message: string }): Promise<void> {
    if (!this.kafkaAvailable) {
      console.error('❌ Kafka no disponible. Guardando en la cola de mensajes fallidos.');
      await this.redisService.pushToDeadLetterQueue(JSON.stringify(
        {
            topic,
            message,
            error: 'Kafka no disponible',
            timestamp: new Date().toISOString(),
          }
      ));
      return;
    }

    try {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: [{ value: message }],
      });
      console.log(`📤 Mensaje enviado al tópico ${topic}`);
    } catch (error) {
      console.error(`❌ Error al enviar mensaje al tópico ${topic}:`, error.message);
      await this.redisService.pushToDeadLetterQueue(JSON.stringify(
        {
            topic,
            message,
            error: error.message,
            timestamp: new Date().toISOString(),
        }
      )
       
      );
    } finally {
      await this.producer.disconnect();
    }
  }
}
