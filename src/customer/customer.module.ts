import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, JwtService],
  imports: [PrismaPostgresModule],
})
export class CustomerModule {}
