import { Module } from '@nestjs/common';
import { BatikController } from './batik.controller';
import { BatikService } from './batik.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BatikController],
  providers: [BatikService, JwtService],
  imports: [PrismaPostgresModule],
})
export class BatikModule {}
