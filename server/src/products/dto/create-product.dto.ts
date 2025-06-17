import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'categoryName không được để trống' })
  @ApiProperty({ example: 'Cà Phê' })
  productName: string;

  @IsString()
  @ApiProperty({ example: 'string' })
  description: string;

  @IsNumber()
  @ApiProperty({ example: 20000 })
  @IsNotEmpty({ message: 'price không được để trống' })
  @Type(() => Number) //ép kiểu về Number
  price: number;

  @ApiProperty({ example: '0' })
  @IsNotEmpty({ message: 'categoryID không được để trống' })
  categoryID: Category;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  avatar: any; // 👈 file dạng binary

  // @IsString()
  // @Optional()
  // @ApiProperty({ example: 'Instock' })
  // status: string;
}
