import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  @ApiProperty({ example: 'Cà Phê' })
  @IsString()
  categoryName: string;
}
