import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Public } from 'src/decorator/customize';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Public()
  @ApiOperation({ summary: 'Tạo danh bàn mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateTableDto,
  })
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Public()
  @ApiOperation({ summary: 'Lấy danh sách bàn' })
  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Lấy thông tin bàn theo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id);
  }

  @Public()
  @ApiOperation({ summary: 'Cập nhật thông tin bàn theo ID' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateTableDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(+id, updateTableDto);
  }

  @Public()
  @ApiOperation({ summary: 'Xoá bàn theo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(+id);
  }
}
