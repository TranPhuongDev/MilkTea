import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiCreatedResponse({
    description: 'Người dùng được tạo thành công',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Yêu cầu không hợp lệ' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }

  @Public()
  @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo email' })
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Public()
  @ApiOperation({ summary: 'Cập nhật user' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateUserDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Public()
  @ApiOperation({ summary: 'Xoá người dùng theo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
