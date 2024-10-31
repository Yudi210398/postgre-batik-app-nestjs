import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${level}] ${context ? '[' + context + ']' : ''} ${message}`;
        }),
      ),
      transports: [new winston.transports.Console()],
    }),
  ],
  exports: [WinstonModule],
})
export class CommonModule {}
