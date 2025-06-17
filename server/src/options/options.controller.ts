import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Public } from 'src/decorator/customize';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Tạo tùy chọn mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateOptionDto,
  })
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Lấy danh sách tất cả tùy chọn' })
  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Lấy thông tin tùy chọn theo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(+id);
  }

  @Public()
  @ApiOperation({ summary: 'Cập nhật tùy chọn theo ID' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateOptionDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(+id, updateOptionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Xóa tùy chọn theo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.remove(+id);
  }
}
