import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'categoryName không được để trống' })
  productName: string;

  @IsString()
  description: string;

  @IsString()
  unit: string;

  @IsNotEmpty({ message: 'categoryID không được để trống' })
  categoryID: Category;

}
