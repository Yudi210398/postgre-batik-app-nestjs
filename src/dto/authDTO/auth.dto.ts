import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDTO {
  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Tidak Boleh kosong,' })
  password: string;
}
