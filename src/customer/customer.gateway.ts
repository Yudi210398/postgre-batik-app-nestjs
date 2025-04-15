import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CustomerService } from './customer.service';

@WebSocketGateway(3003, { cors: { origin: '*' } })
export class CustomerGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly customerService: CustomerService) {}
  onModuleInit() {
    this.server.on('connection', (_socket) => {});
  }

  @SubscribeMessage('customer_update')
  async getCustomer() {
    const data = await this.customerService.getCustomer();
    this.server.emit('customer_update', data);
  }
}
