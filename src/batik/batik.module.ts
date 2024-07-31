import { Module } from '@nestjs/common';
import { BatikController } from './batik.controller';
import { BatikService } from './batik.service';

@Module({
  controllers: [BatikController],
  providers: [BatikService]
})
export class BatikModule {}
