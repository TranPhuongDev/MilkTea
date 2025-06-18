import { Module } from '@nestjs/common';
import { DineinordersService } from './dineinorders.service';
import { DineinordersController } from './dineinorders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesModule } from 'src/tables/tables.module';
import { DineInOrder } from './entities/dineinorder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DineInOrder]), TablesModule],
  exports: [DineinordersService],
  controllers: [DineinordersController],
  providers: [DineinordersService],
})
export class DineinordersModule {}
