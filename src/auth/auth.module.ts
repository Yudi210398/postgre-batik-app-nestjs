import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategis/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategis/jwt.strategy';
@Module({
  imports: [PassportModule, PrismaPostgresModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalGuard,
    JwtService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
