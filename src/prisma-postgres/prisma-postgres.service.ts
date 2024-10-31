import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PrismaPostgresService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({ log: ['error', 'info', 'warn', 'query'] });
  }
  async onModuleInit() {
    await this.$connect()
      .then(async () => {
        const data = await this.admin.findMany();
        if (data.length === 0) {
          await this.admin.create({
            data: {
              email: 'admin@gmail.com',
              password: await bcrypt.hash('lords123', 10),
            },
          });
        }

        console.log(`konek database`);
      })
      .catch((err) => console.log(err));
  }
}
