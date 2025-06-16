import { Module } from '@nestjs/common';
import { DineinorderitemsService } from './dineinorderitems.service';
import { DineinorderitemsController } from './dineinorderitems.controller';

@Module({
  controllers: [DineinorderitemsController],
  providers: [DineinorderitemsService],
})
export class DineinorderitemsModule {}
