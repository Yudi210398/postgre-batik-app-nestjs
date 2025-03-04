import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dto/customerDTO/createCustomer.dto';
import { revalidate } from 'src/func/fetch';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaPostgresService) {}

  async createCustomer(customer: CreateCustomerDto) {
    const datass = await this.prismaService.customer.create({
      data: { namaCustomer: customer.namaCustomer },
    });3

    await revalidate();
    return datass;
  }

  async getPembelianCustomer(id: number) {
    const getPembeli = await this.prismaService.customer.findFirst({
      where: { id },
      include: { Pembelian: { include: { batik: true } } },
    });
    return getPembeli;
  }

  async getSeacrhIdCustomer(id: number) {
    const data = await this.prismaService.pembelian.findMany({
      where: { customerId: id },
      include: { batik: true, customer: true },
    });
    return data;
  }

  async getCustomer() {
    const hasilGEt = await this.prismaService.customer.findMany({
      include: { Pembelian: { include: { batik: true } } },
    });

    revalidate();
    return hasilGEt;
  }
}
