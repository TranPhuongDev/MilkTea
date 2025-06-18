import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Public } from 'src/decorator/customize';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Tạo đánh giá mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateReviewDto,
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách đánh giá' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách đánh giá theo id' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Cập nhật đánh giá' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateReviewDto,
  })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đánh giá' })
  @Public()
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
