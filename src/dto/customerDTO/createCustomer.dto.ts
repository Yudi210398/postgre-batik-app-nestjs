import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  namaCustomer: string;
}
