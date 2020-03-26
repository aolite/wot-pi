import { Test, TestingModule } from '@nestjs/testing';
import { PiController } from './pi.controller';

describe('Pi Controller', () => {
  let controller: PiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiController],
    }).compile();

    controller = module.get<PiController>(PiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
