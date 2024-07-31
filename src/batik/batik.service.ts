import { Injectable } from '@nestjs/common';

@Injectable()
export class BatikService {
  async sayhai(name: string) {
    return await `hai ${name}`;
  }
}
