import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dto/authDTO/paginationDto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';

@Injectable()
export class PembelianService {
  constructor(private readonly prismaService: PrismaPostgresService) {}

  async pembelianBatik(datass: PembelianDTO) {
    const time = new Date();
    const tanggalResmi = new Intl.DateTimeFormat('id-ID').format(time);
    const cekbatik = await this.prismaService.batik.findFirst({
      where: { id: datass.batikId },
    });

    const cekCustomer = await this.prismaService.customer.findFirst({
      where: { id: datass.customerId },
    });

    const cekQuantityStock = await this.prismaService.laporanBulanan.findMany();

    if (cekQuantityStock.length !== 0) {
      // ? cek kalo data gk kosong mau apa ? mau cek quantity bulanannya lebih gk dari pembelian kalo lebih return error stock tidak mencukupi pembelian
    } else {
      if (datass.quantity > cekbatik.stockSaatIni)
        throw new HttpException(
          'Quantity melebihi data stock',
          HttpStatus.CONFLICT,
        );
    }

    if (!cekbatik)
      throw new HttpException(
        'Type Batik tidak ditemukan',
        HttpStatus.NOT_FOUND,
      );
    else if (!cekCustomer)
      throw new HttpException('Customer tidak ditemukan', HttpStatus.NOT_FOUND);

    return await this.prismaService.$transaction(async (prisma) => {
      const beli = await prisma.pembelian.create({
        data: {
          batikId: datass.batikId,
          customerId: datass.customerId,
          quantity: datass.quantity,
          nomorBon: datass.nomorBon,
          waktuBikin: time,
          tanggalString: tanggalResmi,
        },
      });

      await prisma.batik.update({
        where: { id: datass.batikId },
        data: { stockSaatIni: { decrement: datass.quantity } },
      });

      return beli;
    });
  }

  async getPembelian() {
    return await this.prismaService.pembelian.findMany({
      include: { batik: true, customer: true },
      orderBy: { id: 'desc' },
    });
  }

  async getPembelianPagination(pagination: PaginationDto) {
    const page = Number(pagination.page) || 1;
    const limit = Number(pagination.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await this.prismaService.pembelian.findMany({
      include: { batik: true, customer: true },
      skip: skip,
      take: limit,
    });
    const totalData = await this.prismaService.pembelian.count();
    return { data, totalData };
  }
}
