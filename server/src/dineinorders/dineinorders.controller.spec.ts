import { Test, TestingModule } from '@nestjs/testing';
import { DineinordersController } from './dineinorders.controller';
import { DineinordersService } from './dineinorders.service';

describe('DineinordersController', () => {
  let controller: DineinordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DineinordersController],
      providers: [DineinordersService],
    }).compile();

    controller = module.get<DineinordersController>(DineinordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
