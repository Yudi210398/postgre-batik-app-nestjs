import { Test, TestingModule } from '@nestjs/testing';
import { PrismaPostgresService } from './prisma-postgres.service';

describe('PrismaPostgresService', () => {
  let service: PrismaPostgresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaPostgresService],
    }).compile();

    service = module.get<PrismaPostgresService>(PrismaPostgresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
