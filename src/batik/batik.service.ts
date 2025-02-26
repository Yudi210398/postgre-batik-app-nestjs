import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBatikDto } from 'src/dto/createBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';
import { DateTime } from 'luxon';
import { JwtPayload } from 'src/func/interface';
import { revalidate } from 'src/func/fetch';
import { BatikAddDTO } from 'src/dto/BatikDTO/BatikAdd.dto';
@Injectable()
export class BatikService {
  constructor(private prismaService: PrismaPostgresService) {}

  async createBatik(datas: CreateBatikDto) {
    return await this.prismaService.batik.create({
      data: {
        typeBatik: datas.typeBatik,
        stockBatikAwal: +datas.stockBatikAwal,
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
    console.log(dates, datass);
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
    return hasilGet;
  }

  async updateBatik(id: number, datas: UpdateBatiks) {
    const data = await this.prismaService.batik.update({
      where: { id },
      data: {
        stockBatikAwal: datas.stockBatikAwal,
        typeBatik: datas.typeBatik,
      },
    });
    return data;
  }

  async getSeacrhBatikId(id: number) {
    const data = await this.prismaService.pembelian.findMany({
      where: { batikId: id },
      include: { batik: true, customer: true },
    });
    return data;
  }

  async penambahanBatiks(data: BatikAddDTO) {
    const dataKembar = await this.prismaService.batik.findFirst({
      where: { typeBatik: data.typeBatik },
    });

    if (dataKembar)
      throw new HttpException('Data Sudah Ada', HttpStatus.CONFLICT);

    await this.prismaService.batik.create({
      data: {
        typeBatik: data.typeBatik,
        stockBatikAwal: data.stockBatikAwal,
        jenisBatik: data.jenisBatik,
      },
    });
    await revalidate();
    return {
      mesaage: 'Berhasil ditambah Batik',
    };
  }

  async pembelianBatik(datass: PembelianDTO) {
    const time = new Date();
    const d = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(time);
    console.log(d);
    this.prismaService.$transaction(async (prisma) => {
      const datas = await prisma.pembelian.create({
        data: {
          batikId: datass.batikId,
          customerId: datass.customerId,
          quantity: datass.quantity,
          nomorBon: datass.nomorBon,
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

  async getDataBatikDinamis() {
    const users = await this.prismaService.batik.findMany({
      include: { Pembelian: true },
    });

    const hasil = users.map((data) => {
      const total = data.Pembelian.reduce((total, data) => {
        return total + data.quantity;
      }, 0);

      return {
        ...data,
        stockBatikAwal: data.stockBatikAwal - total,
      };
    });

    return hasil;
  }
}
