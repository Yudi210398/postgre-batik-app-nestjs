import { Module } from '@nestjs/common';
import { BatikModule } from './batik/batik.module';
import { PrismaPostgresModule } from './prisma-postgres/prisma-postgres.module';

@Module({
  imports: [BatikModule, PrismaPostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
