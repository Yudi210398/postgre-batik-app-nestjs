import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BatikService } from './batik.service';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/dto/authDTO/paginationDto';

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
  async dapatBatikUpdate(@MessageBody() payload: any) {
    const dto = plainToInstance(PaginationDto, payload);
    const data = await this.batikService.getDataBatikDinamis();
    this.server.emit('batik_update', data);
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
