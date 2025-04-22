import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CustomerService } from './customer.service';
import { Socket } from 'dgram';

@WebSocketGateway(3003, { cors: { origin: '*' } })
export class CustomerGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly customerService: CustomerService) {}
  onModuleInit() {
    this.server.on('connection', (_socket) => {});
  }

  @SubscribeMessage('customer_update')
  async getCustomer(@ConnectedSocket() client: Socket) {
    const data = await this.customerService.getCustomer();
    client.emit('customer_update', data);
  }
}
