import { Injectable } from '@nestjs/common';
import { CreateAdminDTO } from 'src/dto/authDTO/auth.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaPostgresService) {}

  async daftar(data: CreateAdminDTO) {
    const cekEmail = await this.prismaService.admin.findUnique({
      where: { email: data.email },
    });
  }
}
