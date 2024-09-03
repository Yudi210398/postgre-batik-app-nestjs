import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from 'src/dto/customerDTO/createCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCustomer(@Body() customer: CreateCustomerDto) {
    return this.customerService.createCustomer(customer);
  }

  @Get()
  async getCustomer() {
    return await this.customerService.getCustomer();
  }
}
