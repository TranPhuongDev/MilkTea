import { Module } from '@nestjs/common';
import { DineinorderitemsService } from './dineinorderitems.service';
import { DineinorderitemsController } from './dineinorderitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DineInOrderItem } from './entities/dineinorderitem.entity';
import { ProductsModule } from 'src/products/products.module';
import { DineinordersModule } from 'src/dineinorders/dineinorders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DineInOrderItem]),
    ProductsModule,
    DineinordersModule,
  ],
  controllers: [DineinorderitemsController],
  providers: [DineinorderitemsService],
  exports: [DineinorderitemsService],
})
export class DineinorderitemsModule {}
