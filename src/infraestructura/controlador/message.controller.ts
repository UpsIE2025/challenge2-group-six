import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { SendMessageUseCaseService } from '../servicios/send-message-use-case.service';

@Controller('api')
export class MessageController {
    constructor(private readonly sendMessageUseCase: SendMessageUseCaseService) {}

    @Post('messages')
    @HttpCode(HttpStatus.OK)
    async sendMessage(@Body('message') message: string, @Res() res: Response): Promise<void> {
        try {
            await this.sendMessageUseCase.execute({ message });
            res.json({ success: true, message: '📤 Mensaje enviado correctamente' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error al enviar el mensaje', error: error.message });
        }
    }
}