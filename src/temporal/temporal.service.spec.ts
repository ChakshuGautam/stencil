import { Test, TestingModule } from '@nestjs/testing';
import { TemporalService } from './temporal.service';

describe('TemporalService', () => {
  let service: TemporalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemporalService],
    }).compile();

    service = module.get<TemporalService>(TemporalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
