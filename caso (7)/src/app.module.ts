import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './infraestructura/servicios/redis.service';
import { KafkaService } from './infraestructura/servicios/kafka.service';
import { SendMessageUseCaseService } from './infraestructura/servicios/send-message-use-case.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RedisService, KafkaService, SendMessageUseCaseService],
  exports:[RedisService, KafkaService, SendMessageUseCaseService]
})
export class AppModule {}
