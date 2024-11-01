import { Injectable } from '@nestjs/common';
import { CreateBatikDto } from 'src/dto/createBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';
import { DateTime } from 'luxon';
import { JwtPayload } from 'src/func/interface';
import { revalidate } from 'src/func/fetch';
@Injectable()
export class BatikService {
  constructor(private prismaService: PrismaPostgresService) {}

  async createBatik(datas: CreateBatikDto) {
    return await this.prismaService.batik.create({
      data: {
        typeBatik: datas.typeBatik,
        totalBatik: +datas.totalBatik,
        jenisBatik: datas.jenisBatik,
      },
    });
  }

  async getBatik() {
    const hasilGEt = await this.prismaService.batik.findMany({
      include: { Pembelian: { include: { customer: true } } },
    });
    return hasilGEt;
  }

  async getBatikPembelian(datass: JwtPayload) {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDay();
    const hours = data.getHours();
    const minute = data.getMinutes();
    const time = new Date();
    const dates = DateTime.fromObject({
      year,
      month,
      day,
      hour: hours,
      minute,
    });

    const d = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(time);
    console.log(d);
    const hasilGEt = await this.prismaService.batik.findMany({
      include: { Pembelian: { include: { customer: true } } },
    });

    return hasilGEt;
  }

  async getDataPembelian() {
    const hasilGet = await this.prismaService.pembelian.findMany({
      include: { batik: true, customer: true },
    });
    console.log(hasilGet, `wiw`);
    return hasilGet;
  }

  async updateBatik(id: number, datas: UpdateBatiks) {
    const data = await this.prismaService.batik.update({
      where: { id },
      data: { totalBatik: datas.totalBatik, typeBatik: datas.typeBatik },
    });
    return data;
  }

  async getSeacrhId(id: number) {}

  async pembelianBatik(datass: PembelianDTO) {
    const time = new Date();
    const d = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(time);
    console.log(d);
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

          waktuBikin: time,
        },
        include: { batik: true, customer: true },
      });
      await revalidate();
      return datas;
    });
    return {
      mesaage: 'Berhasil dibeli',
    };
  }
}
