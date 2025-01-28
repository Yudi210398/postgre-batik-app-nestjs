import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBatikDto {
  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  typeBatik: string;

  @IsNumber({}, { message: 'Harus Angka' })
  stockBatikAwal: number;

  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  jenisBatik: string;
}
