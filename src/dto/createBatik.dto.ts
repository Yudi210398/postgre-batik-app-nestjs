import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBatikDto {
  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  typeBatik: string;

  @IsInt({ message: 'data harus number' })
  totalBatik: number;

  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  jenisBatik: string;
}
