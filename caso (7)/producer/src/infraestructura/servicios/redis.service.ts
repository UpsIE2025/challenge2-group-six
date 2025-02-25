// redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import config from '../configuracion/redis';


@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private isRedisAvailable = false;

  async onModuleInit(): Promise<void> {
    this.client = new Redis({
      host: config.host,
      port: parseInt(config.port),
      retryStrategy: (times: number) => Math.min(times * 100, 3000),
    });

    this.client.on('connect', () => {
      console.log('✅ Conexión exitosa a Redis');
      this.isRedisAvailable = true;
    });

    this.client.on('error', (error) => {
      console.error(`❌ Error en la conexión de Redis: ${error.message}`);
      this.isRedisAvailable = false;
    });

    this.client.on('close', () => {
      console.warn('⚠️ Redis se ha desconectado');
      this.isRedisAvailable = false;
    });

    this.client.on('reconnecting', () => {
      console.log('♻️ Intentando reconectar a Redis...');
      this.isRedisAvailable = false;
    });

    setInterval(() => this.checkRedisAvailability(), 5000);
  }

  async onModuleDestroy(): Promise<void> {
    await this.closeRedisConnection();
  }

  async checkRedisAvailability(): Promise<void> {
    try {
      await this.client.ping();
      if (!this.isRedisAvailable) {
        console.log('✅ Redis está disponible nuevamente');
        this.isRedisAvailable = true;
      }
    } catch (error) {
      if (this.isRedisAvailable) {
        console.error(`❌ Redis ya no está disponible: ${error.message}`);
        this.isRedisAvailable = false;
      }
    }
  }

  async pushToDeadLetterQueue(message: string): Promise<void> {
    try {
      await this.client.lpush('dead_letter_queue', message);
      console.log('📥 Mensaje agregado a la Dead Letter Queue');
    } catch (error) {
      console.error(`❌ Error al agregar mensaje a la Dead Letter Queue: ${error.message}`);
    }
  }

  async getDeadLetterMessages(): Promise<string[]> {
    try {
      const messages = await this.client.lrange('dead_letter_queue', 0, -1);
      return messages.map(msg => JSON.parse(msg));
    } catch (error) {
      console.error(`❌ Error al obtener mensajes de la Dead Letter Queue: ${error.message}`);
      return [];
    }
  }

  private async closeRedisConnection(): Promise<void> {
    try {
      await this.client.quit();
      console.log('🔌 Conexión a Redis cerrada correctamente');
    } catch (error) {
      console.error(`❌ Error al cerrar la conexión de Redis: ${error.message}`);
    }
  }
}
