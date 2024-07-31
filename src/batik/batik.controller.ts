import { Controller, Get } from '@nestjs/common';
import { BatikService } from './batik.service';

@Controller('batik')
export class BatikController {
  constructor(private readonly batikservice: BatikService) {}
  @Get()
  async test() {
    return await this.batikservice.sayhai('hana');
  }
}
