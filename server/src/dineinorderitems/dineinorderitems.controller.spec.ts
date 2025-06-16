import { Test, TestingModule } from '@nestjs/testing';
import { DineinorderitemsController } from './dineinorderitems.controller';
import { DineinorderitemsService } from './dineinorderitems.service';

describe('DineinorderitemsController', () => {
  let controller: DineinorderitemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DineinorderitemsController],
      providers: [DineinorderitemsService],
    }).compile();

    controller = module.get<DineinorderitemsController>(DineinorderitemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
