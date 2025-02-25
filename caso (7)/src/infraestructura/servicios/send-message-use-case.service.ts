import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class SendMessageUseCaseService {
    private readonly logger = new Logger(SendMessageUseCaseService.name);

    constructor(private kafkaService: KafkaService){}

    async execute({ message }: { message: string }): Promise<void> {
        try {
            await this.kafkaService.sendMessage({
                topic: 'telegrafo',
                 message: message
            });
            this.logger.log('Mensaje enviado correctamente');
        } catch (error) {
            this.logger.error('Error al enviar el mensaje, enviando a la cola de mensajes fallidos', error.trace);
        }
    }
}