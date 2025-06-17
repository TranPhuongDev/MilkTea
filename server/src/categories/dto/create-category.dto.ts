import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Cà Phê' })
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  categoryName: string;
}
