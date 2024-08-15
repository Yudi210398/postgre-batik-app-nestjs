import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './createCustomer.dto';

export class UpdateCustomer extends PartialType(CreateCustomerDto) {}
