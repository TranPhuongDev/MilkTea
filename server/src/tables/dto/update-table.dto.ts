import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTableDto {
  @ApiProperty({ example: 'Bàn 1' })
  @IsOptional()
  tableName: string;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  capacity?: number;

  @ApiProperty({ example: 'Khu A' })
  @IsOptional()
  @IsNotEmpty({ message: 'Vị trí không được để trống' })
  location: string;
}
