import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOptionvalueDto {
  @ApiProperty({ example: 'S' })
  @IsNotEmpty({ message: 'Giá trị tùy chọn không được để trống' })
  name: string;

  @ApiProperty({ example: 0.0 })
  @IsNotEmpty({ message: 'Giá điều chỉnh không được để trống' })
  priceAdjustment: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'optionId tùy chọn không được để trống' })
  optionId: number; // Foreign key column
}
