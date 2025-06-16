import { Test, TestingModule } from '@nestjs/testing';
import { DineinorderitemsService } from './dineinorderitems.service';

describe('DineinorderitemsService', () => {
  let service: DineinorderitemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DineinorderitemsService],
    }).compile();

    service = module.get<DineinorderitemsService>(DineinorderitemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
