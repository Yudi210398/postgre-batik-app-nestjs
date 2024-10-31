import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors({
    origin: 'http://localhost:3000', // Ganti ini dengan URL frontend kamu
    credentials: true, // Mengizinkan pengiriman cookie
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Ijinkan method-method ini
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
