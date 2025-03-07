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
import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { BatikAddDTO } from 'src/dto/BatikDTO/BatikAdd.dto';

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

  @Patch('update/:id')
  async updateBatik(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBatiks,
  ) {
    return this.batikservice.updateBatik(id, data);
  }

  @Get('getDataBatik')
  async getBatikData() {
    return await this.batikservice.getDataBatikDinamis();
  }

  @Get('/:id')
  async getBatikId(@Param('id', ParseIntPipe) id: number) {
    return await this.batikservice.getSeacrhBatikId(id);
  }

  @Post('tambahbatik')
  async tambahBatik(@Body() datas: BatikAddDTO) {
    return await this.batikservice.penambahanBatiks(datas);
  }

  @Post('beli')
  async beliBatik(@Body() datas: PembelianDTO) {
    return await this.batikservice.pembelianBatik(datas);
  }
}
