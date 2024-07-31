import { Module } from '@nestjs/common';
import { BatikModule } from './batik/batik.module';

@Module({
  imports: [BatikModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
