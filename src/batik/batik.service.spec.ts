import { Test, TestingModule } from '@nestjs/testing';
import { BatikService } from './batik.service';

describe('BatikService', () => {
  let service: BatikService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatikService],
    }).compile();

    service = module.get<BatikService>(BatikService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
