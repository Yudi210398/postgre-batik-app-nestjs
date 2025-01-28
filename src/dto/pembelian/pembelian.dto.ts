import { IsInt, IsNotEmpty } from 'class-validator';

export class PembelianDTO {
  @IsInt({ message: 'data harus number' })
  @IsNotEmpty({ message: 'batikId Tidak Boleh kosong,' })
  batikId: number;

  @IsInt({ message: 'data harus number' })
  @IsNotEmpty({ message: 'customerId Tidak Boleh kosong,' })
  customerId: number;

  @IsInt({ message: 'data harus number' })
  @IsNotEmpty({ message: 'quantity Tidak Boleh kosong,' })
  quantity: number;

  nomorBon?: string;
}
