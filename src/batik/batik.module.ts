import { Module } from '@nestjs/common';
import { BatikController } from './batik.controller';
import { BatikService } from './batik.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';

@Module({
  controllers: [BatikController],
  providers: [BatikService],
  imports: [PrismaPostgresModule],
})
export class BatikModule {}
