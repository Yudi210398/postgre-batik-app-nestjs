import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDTO } from 'src/dto/authDTO/auth.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaPostgresService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: CreateAdminDTO) {
    const data = await this.validate(user);
    const payload = {
      email: data.email,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.SECRET_KEY_REFRESH_TOKEN,
    });

    await this.prismaService.admin.update({
      where: { email: user.email },
      data: { refreshToken },
    });
    return {
      email: user.email,
      allToken: {
        accesToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1m',
          secret: process.env.SECRET_KEY_ACCES_TOKEN,
        }),
      },
      refreshToken,
    };
  }

  async validate(user: CreateAdminDTO) {
    const users = await this.prismaService.admin.findFirst({
      where: { email: user.email },
    });

    if (users && (await bcrypt.compare(user.password, users.password)))
      return await users;

    throw new HttpException(
      'email atau Password Salah',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
