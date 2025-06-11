import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token =
      client.handshake?.auth?.token ||
      (client.handshake?.headers?.authorization
        ? client.handshake.headers.authorization.split(' ')[1]
        : null);
    console.log(client.handshake);
    if (!token) throw new WsException('Missing token'); // GANTI PAKE WsException

    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      return true;
    } catch (e) {
      throw new WsException('Invalid token'); // GANTI PAKE WsException
    }
  }
}
