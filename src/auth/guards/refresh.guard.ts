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
export class RefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaPostgresService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);

    const getToken = this.prismaService.admin.findFirst({});

    if (!(await getToken).refreshToken) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(
        (await getToken).refreshToken,
        {
          secret: process.env.REFRESH_TOKEN,
        },
      );
      request['admin'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
