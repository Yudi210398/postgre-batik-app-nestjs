import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDTO } from 'src/dto/authDTO/auth.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaPostgresService,
    private readonly jwtService: JwtService,
  ) {}

  async refreshTokenCall(admin: any, res: Response) {
    const payload = {
      email: admin.email,
    };
    const aksesToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1m',
      secret: process.env.ACCES_TOKEN,
    });
    res.cookie(`jwt`, aksesToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 1000,
    });

    res.json({ pesan: `berhasil dapat get Akses dari Refresh Token` });
  }

  async login(user: CreateAdminDTO, res: Response) {
    const data = await this.validate(user);
    const payload = {
      email: data.email,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2m',
      secret: process.env.REFRESH_TOKEN,
    });

    const aksesToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.ACCES_TOKEN,
    });

    await this.prismaService.admin.update({
      where: { email: user.email },
      data: { refreshToken },
    });

    res.cookie(`jwt`, aksesToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    res.json({ pesan: `berhasil login` });
  }

  async validate(user: CreateAdminDTO) {
    const users = await this.prismaService.admin.findFirst({
      where: { email: user.email },
    });

    if (users && (await bcrypt.compare(user.password, users.password)))
      return users;

    throw new HttpException(
      'email atau Password Salah',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
