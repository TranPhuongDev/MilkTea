import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionvaluesService } from './optionvalues.service';
import { CreateOptionvalueDto } from './dto/create-optionvalue.dto';
import { UpdateOptionvalueDto } from './dto/update-optionvalue.dto';
import { Public } from 'src/decorator/customize';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('optionvalues')
export class OptionvaluesController {
  constructor(private readonly optionvaluesService: OptionvaluesService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Tạo giá trị tùy chọn mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateOptionvalueDto,
  })
  async create(@Body() createOptionvalueDto: CreateOptionvalueDto) {
    return await this.optionvaluesService.create(createOptionvalueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả giá trị tùy chọn' })
  @Public()
  async findAll() {
    return await this.optionvaluesService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Lấy thông tin giá trị tùy chọn theo ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.optionvaluesService.findOne(+id);
  }

  @Public()
  @ApiOperation({ summary: 'Cập nhật tùy chọn theo ID' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateOptionvalueDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOptionvalueDto: UpdateOptionvalueDto,
  ) {
    return await this.optionvaluesService.update(+id, updateOptionvalueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa giá trị tùy chọn theo Id' })
  @Public()
  async remove(@Param('id') id: string) {
    return await this.optionvaluesService.remove(+id);
  }
}
