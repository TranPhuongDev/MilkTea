import { Module } from '@nestjs/common';
import { OptionvaluesService } from './optionvalues.service';
import { OptionvaluesController } from './optionvalues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionValue } from './entities/optionvalue.entity';
import { OptionsModule } from 'src/options/options.module';

@Module({
  imports: [TypeOrmModule.forFeature([OptionValue]), OptionsModule],
  controllers: [OptionvaluesController],
  providers: [OptionvaluesService],
  exports: [OptionvaluesService],
})
export class OptionvaluesModule {}
