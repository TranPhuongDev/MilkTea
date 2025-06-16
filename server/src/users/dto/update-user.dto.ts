import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  // userName: string;
  // email: string;
  @ApiProperty({ example: '********' })
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'Admin' })
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Manager' })
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'YYYY/MM/DD HH:mm:ss' })
  @IsOptional()
  dateOfBirth: Date;
}
