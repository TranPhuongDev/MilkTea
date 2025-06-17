import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateOptionDto {
  @ApiProperty({ example: 'Size' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'radio/checkbox' })
  @IsOptional()
  type: string;

  @ApiProperty({ example: false })
  @IsOptional()
  isRequired: boolean;
}
