import { Module } from '@nestjs/common';
import { BatikModule } from './batik/batik.module';
import { PrismaPostgresModule } from './prisma-postgres/prisma-postgres.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BatikModule,
    PrismaPostgresModule,
    CustomerModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
