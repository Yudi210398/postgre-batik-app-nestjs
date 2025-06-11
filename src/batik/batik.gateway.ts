import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BatikService } from './batik.service';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/dto/authDTO/paginationDto';
import { validate } from 'class-validator';
import { Socket } from 'dgram';

// @UseGuards(WsJwtGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class BatikGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly batikService: BatikService) {}

  onModuleInit() {
    this.server.on('connection', (_socket) => {
      console.log(`konek`);
    });
  }

  @SubscribeMessage('batik_update')
  async dapatBatikUpdate(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const dto = plainToInstance(PaginationDto, payload);
      console.log(dto, `cak`);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return client.emit(`batik_update_error`, {
          message: `invalid payload`,
          errors,
        });
      }

      const data = await this.batikService.getDataBatikDinamis();
      console.log(data);
      client.emit('batik_update', data);
    } catch (error) {
      client.emit(`batik_update_error`, {
        message: `something went wrong`,
        error,
      });
    }
  }

  @SubscribeMessage('pembelian_update')
  async pembelianBatikUpdate(
    @MessageBody() { page, limit }: { page: number; limit: number },
  ) {
    console.log(limit, page, `cak bgt gw`);
    const data = await this.batikService.getPembelian();
    this.server.emit('pembelian_update', data);
  }

  @SubscribeMessage('update')
  async handleClientReq(@MessageBody() mesaage: any) {
    this.server.emit('events', { pesan: 'Hai', body: mesaage });
  }
}
