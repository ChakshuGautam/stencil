import { Test, TestingModule } from '@nestjs/testing';
import { TemporalController } from './temporal.controller';

describe('TemporalController', () => {
  let controller: TemporalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemporalController],
    }).compile();

    controller = module.get<TemporalController>(TemporalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
