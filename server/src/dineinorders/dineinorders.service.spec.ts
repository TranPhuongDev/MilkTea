import { Test, TestingModule } from '@nestjs/testing';
import { DineinordersService } from './dineinorders.service';

describe('DineinordersService', () => {
  let service: DineinordersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DineinordersService],
    }).compile();

    service = module.get<DineinordersService>(DineinordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
