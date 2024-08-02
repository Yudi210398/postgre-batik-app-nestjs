import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';

@Injectable()
export class BatikService {
  constructor(private prismaService: PrismaPostgresService) {}
  async sayhai(name: string) {
    return await `hai ${name}`;
  }
}
