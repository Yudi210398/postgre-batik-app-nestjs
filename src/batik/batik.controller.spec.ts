import { Test, TestingModule } from '@nestjs/testing';
import { BatikController } from './batik.controller';

describe('BatikController', () => {
  let controller: BatikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatikController],
    }).compile();

    controller = module.get<BatikController>(BatikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
