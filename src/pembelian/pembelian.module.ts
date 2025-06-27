import { Module } from '@nestjs/common';
import { PembelianController } from './pembelian.controller';
import { PembelianService } from './pembelian.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PembelianController],
  providers: [PembelianService, JwtService],
  imports: [PrismaPostgresModule],
})
export class PembelianModule {}
