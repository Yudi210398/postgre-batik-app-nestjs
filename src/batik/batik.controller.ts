import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BatikService } from './batik.service';
import { CreateBatikDto } from 'src/dto/createBatik.dto';
// import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { BatikAddDTO } from 'src/dto/BatikDTO/BatikAdd.dto';
import { UpdateBon } from 'src/dto/pembelian/updateBon.dto';

@UseGuards(JwtGuard)
@Controller('batiks')
export class BatikController {
  constructor(private readonly batikservice: BatikService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createBatik(@Body() batik: CreateBatikDto) {
    return this.batikservice.createBatik(batik);
  }

  @Get()
  async getData(@Req() req: Request) {
    const data = req['admin'];
    return await this.batikservice.getBatikPembelian(data);
  }

  @Get('search/:id')
  async getDataId(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    console.log(id, `lers`);
    // return await this.batikservice.getBatikPembelian();
  }

  @Get('getbeliBAtik/:id')
  async getIdBatikBeli(@Param('id', ParseIntPipe) id: number) {
    return this.batikservice.getPembelianid(id);
  }

  @Get('getDataBatik')
  async getBatikData() {
    return await this.batikservice.getDataBatikDinamis();
  }

  @Get('getDataBatikPembelian')
  async getBatikDataPembelian() {
    return await this.batikservice.getPembelian();
  }

  @Get('/:id(\\d+)')
  async getBatikId(@Param('id', ParseIntPipe) id: number) {
    return await this.batikservice.getSeacrhBatikId(id);
  }

  @Patch('bonedit/:id')
  async editNomorBon(@Param('id') id: number, @Body() bon: UpdateBon) {
    return await this.batikservice.editNomorBon(id, bon);
  }

  @Get('selectbatik')
  async batikDinamis(@Query('fields') fields: string) {
    return await this.batikservice.getDataBatikSelect(fields);
  }

  @Post('tambahbatik')
  async tambahBatik(@Body() datas: BatikAddDTO) {
    return await this.batikservice.penambahanBatiks(datas);
  }

  @Post('beli')
  async beliBatik(@Body() datas: PembelianDTO) {
    return await this.batikservice.pembelianBatik(datas);
  }

  @Patch('updatebon/edit/:id')
  async updateBatik(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBon,
  ) {
    return this.batikservice.editNomorBon(id, data);
  }
}
