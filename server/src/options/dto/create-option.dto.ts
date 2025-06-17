import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({ example: 'Size' })
  @IsNotEmpty({ message: 'Tên tùy chọn không được để trống' })
  name: string;

  @ApiProperty({ example: 'radio/checkbox' })
  @IsNotEmpty({ message: 'Kiểu không được để trống' })
  type: string;

  @ApiProperty({ example: 'flase' })
  @IsOptional()
  isRequired: boolean;
}
