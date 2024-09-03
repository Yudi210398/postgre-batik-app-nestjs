import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaPostgresModule } from 'src/prisma-postgres/prisma-postgres.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaPostgresModule],
})
export class AuthModule {}
