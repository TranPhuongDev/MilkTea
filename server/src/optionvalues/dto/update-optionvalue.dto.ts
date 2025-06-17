import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOptionvalueDto {
  @ApiProperty({ example: 'S' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 0.0 })
  @IsOptional()
  priceAdjustment: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  optionId: number; // Foreign key column
}
