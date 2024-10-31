import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'namaCustomer Tidak Boleh kosong,' })
  namaCustomer: string;
}
