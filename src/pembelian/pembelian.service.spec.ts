import { Test, TestingModule } from '@nestjs/testing';
import { PembelianService } from './pembelian.service';

const mockPrismaService = {
  pembelian: {
    findMany: jest.fn(),
  },
};

describe('PembelianService', () => {
  let service: PembelianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PembelianService,
        { provide: 'PrismaService', useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PembelianService>(PembelianService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
