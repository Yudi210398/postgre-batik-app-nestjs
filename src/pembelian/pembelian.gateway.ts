import { OnModuleInit, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PembelianService } from './pembelian.service';
import { Socket } from 'dgram';
import { PaginationDto } from 'src/dto/authDTO/paginationDto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class PembelianGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly pembelianService: PembelianService) {}

  onModuleInit() {
    this.server.on('connection', (_socket) => {
      console.log(`konek`);
    });
  }

  @SubscribeMessage('pembelianPage')
  async getUpdatePagination(
    @MessageBody() dto: PaginationDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { data, totalData } =
      await this.pembelianService.getPembelianPagination(dto);
    console.log(dto);
    client.emit('pembelianPage', { data, totalData });
  }
}
