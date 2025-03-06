import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BatikService } from './batik.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class BatikGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly batikService: BatikService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(`konek`);
    });
  }

  @SubscribeMessage('batik_update')
  async dapatBatikUpdate(
    @MessageBody() { limit, page }: { limit: number; page: number },
  ) {
    console.log(`dari mana`, limit, page);
    const data = await this.batikService.getDataBatikDinamis();
    this.server.emit('batik_update', data);
  }

  @SubscribeMessage('update')
  async handleClientReq(@MessageBody() mesaage: any) {
    this.server.emit('events', { pesan: 'Hai', body: mesaage });
  }
}
