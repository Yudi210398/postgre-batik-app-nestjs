import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from 'src/dto/customerDTO/createCustomer.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  async createCustomer(@Body() customer: CreateCustomerDto) {
    return this.customerService.createCustomer(customer);
  }

  @Get()
  async getCustomer() {
    return await this.customerService.getCustomer();
  }

  @Get('cari/:id')
  async getPembelianCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getPembelianCustomer(id);
  }
}
