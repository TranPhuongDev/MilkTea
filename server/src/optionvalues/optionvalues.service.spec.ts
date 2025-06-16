import { Test, TestingModule } from '@nestjs/testing';
import { OptionvaluesService } from './optionvalues.service';

describe('OptionvaluesService', () => {
  let service: OptionvaluesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionvaluesService],
    }).compile();

    service = module.get<OptionvaluesService>(OptionvaluesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
