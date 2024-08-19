import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BatikService } from './batik.service';
import { CreateBatikDto } from 'src/dto/createBatik.dto';
import { UpdateBatiks } from 'src/dto/updateBatik.dto';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
@Controller('batik')
export class BatikController {
  constructor(private readonly batikservice: BatikService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createBatik(@Body() batik: CreateBatikDto) {
    return this.batikservice.createBatik(batik);
  }

  @Get()
  async getData() {
    return await this.batikservice.getBatikPembelian();
  }

  @Patch('searh/:id')
  updateBatik(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBatiks,
  ) {
    return this.batikservice.updateBatik(id, data);
  }

  @Post('beli')
  async beliBatik(@Body() datas: PembelianDTO) {
    return await this.batikservice.pembelianBatik(datas);
  }
}
