import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
    console.log(data, `oy `);
    return await this.batikservice.getBatikPembelian(data);
  }

  @Get('search/:id')
  async getDataId(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    console.log(id, `lers`);
    // return await this.batikservice.getBatikPembelian();
  }

  @Patch('update/:id')
  updateBatik(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBatiks,
  ) {
    return this.batikservice.updateBatik(id, data);
  }

  @Post('beli')
  async beliBatik(@Body() datas: PembelianDTO) {
    console.log(process.env.NODE_ENV, `wer`);
    return await this.batikservice.pembelianBatik(datas);
  }
}
