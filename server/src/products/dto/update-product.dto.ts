import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ example: 'Cà Phê' })
  productName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'string' })
  description: string;

  @IsOptional()
  @ApiProperty({ example: 20000 })
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'string' })
  avatar: string;

  @IsOptional()
  @ApiProperty({ example: '1/0' })
  status: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  categoryID: Category;
}
