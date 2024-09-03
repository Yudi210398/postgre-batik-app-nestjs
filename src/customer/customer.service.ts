import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dto/customerDTO/createCustomer.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaPostgresService) {}

  async createCustomer(customer: CreateCustomerDto) {
    return this.prismaService.customer.create({
      data: { namaCustomer: customer.namaCustomer },
    });
  }

  async getCustomer() {
    const hasilGEt = await this.prismaService.customer.findMany({
      include: { Pembelian: { include: { batik: true } } },
    });
    return hasilGEt;
  }
}
