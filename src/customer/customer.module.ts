import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [PrismaPostgresModule],
})
export class CustomerModule {}
