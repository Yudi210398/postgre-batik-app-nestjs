import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDTO } from 'src/dto/authDTO/auth.dto';
import { Request, Response } from 'express';
import { RefreshGuard } from './guards/refresh.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  login(@Body() data: CreateAdminDTO, @Res() res: Response) {
    console.log(`cek fe`);
    return this.authservice.login(data, res);
  }

  @UseGuards(RefreshGuard)
  @Post('refreshToken')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const user = req['admin']?.email;
    console.log(user);
    return this.authservice.refreshTokenCall(user, res);
  }
}
