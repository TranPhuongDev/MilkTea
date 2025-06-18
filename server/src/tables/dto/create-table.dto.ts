import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 'Bàn 1' })
  @IsNotEmpty({ message: 'Tên bàn không được để trống' })
  tableName: string;

  @ApiProperty({ example: 4, required: false })
  @IsNotEmpty({ message: 'Số lượng chỗ ngồi không được để trống' })
  capacity?: number;

  @ApiProperty({ example: 'Khu A' })
  @IsNotEmpty({ message: 'Vị trí không được để trống' })
  location: string;
}
