import { Module } from '@nestjs/common';
import { BatikModule } from './batik/batik.module';
import { PrismaPostgresModule } from './prisma-postgres/prisma-postgres.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BatikModule, PrismaPostgresModule, CustomerModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
