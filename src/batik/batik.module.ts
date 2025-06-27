import { Module } from '@nestjs/common';
import { BatikController } from './batik.controller';
import { BatikService } from './batik.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { JwtService } from '@nestjs/jwt';
import { BatikGateway } from './batik.gateway';
import { PembelianService } from 'src/pembelian/pembelian.service';

@Module({
  controllers: [BatikController],
  providers: [BatikService, JwtService, BatikGateway, PembelianService],
  imports: [PrismaPostgresModule],
})
export class BatikModule {}
