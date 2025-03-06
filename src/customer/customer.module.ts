import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { JwtService } from '@nestjs/jwt';
import { CustomerGateway } from './customer.gateway';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, JwtService, CustomerGateway],
  imports: [PrismaPostgresModule],
})
export class CustomerModule {}
