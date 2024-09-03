import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDTO } from 'src/dto/authDTO/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('daftar')
  @UsePipes(ValidationPipe)
  async daftar(@Body() dataDaftar: CreateAdminDTO) {}
}
