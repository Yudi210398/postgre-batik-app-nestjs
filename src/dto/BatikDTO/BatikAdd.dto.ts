import { IsInt, IsNotEmpty } from 'class-validator';

export class BatikAddDTO {
  @IsNotEmpty({ message: 'Type Batik Tidak Boleh kosong,' })
  typeBatik: string;

  @IsInt({ message: 'data harus number' })
  @IsNotEmpty({ message: 'Stock Batik Tidak Boleh kosong,' })
  stockBatikAwal: number;

  @IsNotEmpty({ message: 'Jenis Batik Tidak Boleh kosong,' })
  jenisBatik: string;

  stockSaatIni?: number;
}
