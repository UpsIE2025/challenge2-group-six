import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RedisService } from '../servicios/redis.service';

@Controller('api')
export class CatsController {

  constructor(private redis: RedisService){}
  @Get('failed-messages')
  async getFailedMessages(@Res() res: Response): Promise<void> {
    try {
        const messages = await this.redis.getDeadLetterMessages();
        res.status(HttpStatus.OK).json({ success: true, messages });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error al obtener los mensajes fallidos', error: error.message });
    }
  }
}
