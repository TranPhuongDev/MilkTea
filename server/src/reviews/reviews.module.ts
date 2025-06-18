import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ProductsModule, UsersModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
