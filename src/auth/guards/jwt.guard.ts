import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaPostgresService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const isPublicAccess = this.isPublicRequest(request);
    const token = this.extractTokenFromCookie(request);
    const tokenHeader = this.extractTokenFromHeader(request);
    const secret = '21ac009d-82d8-45d2-9513-f103e6600e51';
    if (!token && !tokenHeader) throw new UnauthorizedException();
    const tokenresult = token ? token : tokenHeader;
    try {
      const payload = await this.jwtService.verifyAsync(tokenresult, {
        secret: secret,
      });
      request['admin'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private isPublicRequest(request: Request): string {
    // Contoh pengecekan berdasarkan port
    const host = request.headers.host; // Mendapatkan host dengan format "localhost:9001"
    const port = host?.split(':')[1]; // Mengambil port dari host

    // Jika request datang dari port 9001 (Public Access), return true
    return port;
  }

  private extractTokenFromHeader(request: Request) {
    const host = request.headers.host;
    console.log(host);
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(req: Request): string | undefined {
    const token = req.cookies?.jwt;

    return token;
  }
}
