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
  async dapatBatikUpdate() {
    const data = await this.batikService.getDataBatikDinamis();
    console.log(data, `we`);
    this.server.emit('batik_update', data);
  }

  @SubscribeMessage('update')
  async handleClientReq(@MessageBody() mesaage: any) {
    this.server.emit('events', { pesan: 'Hai', body: mesaage });
  }
}
