import { Module } from '@nestjs/common';
import { DineinordersService } from './dineinorders.service';
import { DineinordersController } from './dineinorders.controller';

@Module({
  controllers: [DineinordersController],
  providers: [DineinordersService],
})
export class DineinordersModule {}
