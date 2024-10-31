import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, PrismaPostgresModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
