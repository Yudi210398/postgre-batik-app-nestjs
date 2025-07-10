import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PembelianService } from './pembelian.service';
import { PembelianDTO } from 'src/dto/pembelian/pembelian.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PaginationDto } from 'src/dto/authDTO/paginationDto';

@UseGuards(JwtGuard)
@Controller('pembelian')
export class PembelianController {
  constructor(private readonly beliService: PembelianService) {}

  @Get('getDataBatikPembelian')
  async getBatikDataPembelian() {
    return await this.beliService.getPembelian();
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return this.beliService.getPembelianPagination(pagination);
  }

  @Post('batik')
  async beliBatik(@Body() datas: PembelianDTO) {
    return await this.beliService.pembelianBatik(datas);
  }
}
