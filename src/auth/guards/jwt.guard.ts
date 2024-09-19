import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Response } from 'express'; // Pastikan ini di-import
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Override handleRequest untuk menangani error JWT
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const response: Response = context.switchToHttp().getResponse(); // Akses ke response

    // Cek apakah ada error atau user tidak ditemukan
    if (err || !user) {
      // Token kadaluarsa
      if (info instanceof TokenExpiredError) {
        response.status(401); // Set status code menjadi 401 Unauthorized
        console.log('Status Code:', response.statusCode); // Log status code
        throw new UnauthorizedException(
          'Token sudah kadaluarsa, silakan login kembali',
        );
      }
      // Token tidak valid
      else if (info instanceof JsonWebTokenError) {
        response.status(401); // Set status code menjadi 401 Unauthorized
        console.log('Status Code:', response.statusCode); // Log status code
        throw new UnauthorizedException('Token tidak valid');
      }
      // Error lain
      response.status(401); // Set status code menjadi 401 Unauthorized
      console.log('Status Code:', response.statusCode); // Log status code
      throw new UnauthorizedException('Tidak diizinkan');
    }

    // Jika token valid, lanjutkan
    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
