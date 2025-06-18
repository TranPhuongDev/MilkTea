import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  productId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  rating: number;

  @ApiProperty({ example: 'Rất ngon' })
  @IsOptional()
  comment: string;
}
