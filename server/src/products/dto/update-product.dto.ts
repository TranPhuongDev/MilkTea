import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

enum statusPro {
  Outofstock = 'Hết hàng',
  Instock = 'Còn hàng',
}

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
  @ApiPropertyOptional({
    enum: statusPro,
    description: 'Trạng thái ban đầu của đơn hàng',
    example: statusPro.Instock,
  })
  @IsEnum(statusPro)
  status: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  categoryID: Category;
}
