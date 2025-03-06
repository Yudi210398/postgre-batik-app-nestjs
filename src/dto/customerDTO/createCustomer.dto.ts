import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'namaCustomer Tidak Boleh kosong,' })
  namaCustomer: string;

  @Matches(/^08\d{8,11}$/, {
    message:
      'Nomor telepon harus dimulai dengan 08 dan terdiri dari 10-13 digit',
  })
  @Length(10, 13, {
    message: 'nomor telepon harus memiliki panjang 10 atau 13 angka',
  })
  nomorTelp: string;
}
