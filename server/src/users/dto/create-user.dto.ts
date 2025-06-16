import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin.manager' })
  @IsNotEmpty({ message: 'username không được để trống' })
  username: string;

  @IsNotEmpty({ message: 'email không được để trống' })
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail({}, { message: 'email không đúng định dạng' })
  email: string;

  @ApiProperty({ example: '********' })
  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;

  @ApiProperty({ example: 'Admin' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Manager' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'YYYY/MM/DD HH:mm:ss' })
  @IsDate()
  @IsOptional() // Cho phép trường này có thể không có giá trị
  dateOfBirth: Date;
}

export class CodeEmailDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @ApiProperty({ example: '813a14f9-b4fd-4b30-badb-235607ccbbde' })
  @IsNotEmpty({ message: 'code không được để trống' })
  codeId: string;
}

export class ChangePassword {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'password cũ không được để trống' })
  passWordOld: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'password mới không được để trống' })
  passWordNew: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'confirmPassword không được để trống' })
  confirmPassword: string;
}
