import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBatikDto } from 'src/dto/createBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PrismaPostgresService } from 'src/prisma-postgres/prisma-postgres.service';
import { DateTime } from 'luxon';
import { JwtPayload } from 'src/func/interface';
import { revalidate } from 'src/func/fetch';
import { BatikAddDTO } from 'src/dto/BatikDTO/BatikAdd.dto';
import { UpdateBon } from 'src/dto/pembelian/updateBon.dto';
import { PaginationDto } from 'src/dto/authDTO/paginationDto';

@Injectable()
export class BatikService {
  constructor(private prismaService: PrismaPostgresService) {}

  async addData(a: number, b: number) {
    return a + b;
  }

  async createBatik(datas: CreateBatikDto) {
    const time = new Date();
    const tanggalResmi = new Intl.DateTimeFormat('id-ID').format(time);
    return await this.prismaService.batik.create({
      data: {
        typeBatik: datas.typeBatik,
        stockBatikAwal: +datas.stockBatikAwal,
        jenisBatik: datas.jenisBatik,
        tanggalString: tanggalResmi,
        stockSaatIni: +datas.stockBatikAwal,
      },
    });
  }

  async getBatik() {
    const hasilGEt = await this.prismaService.batik.findMany({
      include: { Pembelian: { include: { customer: true } } },
    });
    return hasilGEt;
  }

  async editNomorBon(params: number, bon: UpdateBon) {
    const id = +params;

    const findId = await this.prismaService.pembelian.findFirst({
      where: { id },
    });

    if (!findId) throw new HttpException('Data tidak ditemukan', 404);

    const findIdUpdate = await this.prismaService.pembelian.update({
      where: { id },
      data: { nomorBon: bon.nomorBon },
    });

    return findIdUpdate;
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
      orderBy: { customerId: 'desc' },
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
    const time = new Date();
    const tanggalResmi = new Intl.DateTimeFormat('id-ID').format(time);
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
        tanggalString: tanggalResmi,
        stockSaatIni: data.stockBatikAwal,
      },
    });
    await revalidate();
    return {
      mesaage: 'Berhasil ditambah Batik',
    };
  }

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

  async getDataBatikDinamis(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const take = limit || 10;
    const skip = (page - 1) * take || 0;

    const users = await this.prismaService.batik.findMany({
      skip,
      take,
      include: { Pembelian: true },
      orderBy: { id: 'desc' },
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

  async getPembelian() {
    return await this.prismaService.pembelian.findMany({
      include: { batik: true, customer: true },
      orderBy: { id: 'desc' },
    });
  }

  async getPembelianid(id: number) {
    const data = await this.prismaService.pembelian.findFirst({
      where: { id: id },
      include: { batik: true, customer: true },
    });
    if (!data) throw new HttpException('data tidak ditemukan', 404);
    return data;
  }

  async getDataBatikSelect(fields: string) {
    const selectQuery = fields.split(',');

    const validFields = ['id', 'typeBatik'];

    const prismaSelect = selectQuery
      .filter((field) => validFields.includes(field))
      .reduce((acc, fieldss) => {
        return { ...acc, [fieldss]: true };
      }, {});

    const users = await this.prismaService.batik.findMany({
      select: prismaSelect,
    });

    return users;
  }
}
