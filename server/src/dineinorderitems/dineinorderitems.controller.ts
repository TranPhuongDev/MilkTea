import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DineinorderitemsService } from './dineinorderitems.service';
import { CreateDineinorderitemDto } from './dto/create-dineinorderitem.dto';
import { UpdateDineinorderitemDto } from './dto/update-dineinorderitem.dto';
import { Public } from 'src/decorator/customize';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('dineinorderitems')
export class DineinorderitemsController {
  constructor(
    private readonly dineinorderitemsService: DineinorderitemsService,
  ) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Tạo chi tiết đơn hàng mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateDineinorderitemDto,
  })
  create(@Body() createDineinorderitemDto: CreateDineinorderitemDto) {
    return this.dineinorderitemsService.create(createDineinorderitemDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách chi tiết đơn hàng' })
  findAll() {
    return this.dineinorderitemsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách chi tiết đơn hàng theo id' })
  findOne(@Param('id') id: string) {
    return this.dineinorderitemsService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Cập nhật chi tiết đơn hàng' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateDineinorderitemDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDineinorderitemDto: UpdateDineinorderitemDto,
  ) {
    return this.dineinorderitemsService.update(+id, updateDineinorderitemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa chi tiết đơn hàng' })
  @Public()
  remove(@Param('id') id: string) {
    return this.dineinorderitemsService.remove(+id);
  }
}
