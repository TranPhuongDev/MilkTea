import { Module } from '@nestjs/common';
import { OptionvaluesService } from './optionvalues.service';
import { OptionvaluesController } from './optionvalues.controller';

@Module({
  controllers: [OptionvaluesController],
  providers: [OptionvaluesService],
})
export class OptionvaluesModule {}
