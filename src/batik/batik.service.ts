import { Injectable } from '@nestjs/common';
import { CreateBatikDto } from 'src/dto/createBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';

@Injectable()
export class BatikService {
  constructor(private prismaService: PrismaPostgresService) {}

  async createBatik(datas: CreateBatikDto) {
    return await this.prismaService.batik.create({
      data: { typeBatik: datas.typeBatik, totalBatik: +datas.totalBatik },
    });
  }

  async getBatik() {
    const hasilGEt = await this.prismaService.batik.findMany({
      include: { Pembelian: { include: { customer: true } } },
      where: { typeBatik: 'PA' },
    });

    return hasilGEt;
  }

  async getBatikPembelian() {
    const hasilGEt = await this.prismaService.batik.findMany({
      include: { Pembelian: { include: { customer: true } } },
    });

    return hasilGEt;
  }

  async getDataPembelian() {
    const hasilGet = await this.prismaService.pembelian.findMany({
      include: { batik: true, customer: true },
    });
    return hasilGet;
  }

  async updateBatik(id: number, datas: UpdateBatiks) {
    const data = await this.prismaService.batik.update({
      where: { id },
      data: { totalBatik: datas.totalBatik, typeBatik: datas.typeBatik },
    });
    return data;
  }
  async pembelianBatik(datass: PembelianDTO) {
    this.prismaService.$transaction(async (prisma) => {
      const getBatik = await prisma.batik.findUnique({
        where: { id: datass.batikId },
      });

      await prisma.batik.update({
        where: { id: datass.batikId },
        data: { totalBatik: getBatik.totalBatik - datass.quantity },
      });

      const datas = await prisma.pembelian.create({
        data: {
          batikId: datass.batikId,
          customerId: datass.customerId,
          quantity: datass.quantity,
        },
        include: { batik: true, customer: true },
      });
      return datas;
    });
  }
}
