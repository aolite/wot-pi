import { Test, TestingModule } from '@nestjs/testing';
import { CoapDeviceController } from './coap-device.controller';

describe('CoapDevice Controller', () => {
  let controller: CoapDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoapDeviceController],
    }).compile();

    controller = module.get<CoapDeviceController>(CoapDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
