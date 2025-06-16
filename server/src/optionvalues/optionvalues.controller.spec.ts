import { Test, TestingModule } from '@nestjs/testing';
import { OptionvaluesController } from './optionvalues.controller';
import { OptionvaluesService } from './optionvalues.service';

describe('OptionvaluesController', () => {
  let controller: OptionvaluesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionvaluesController],
      providers: [OptionvaluesService],
    }).compile();

    controller = module.get<OptionvaluesController>(OptionvaluesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
