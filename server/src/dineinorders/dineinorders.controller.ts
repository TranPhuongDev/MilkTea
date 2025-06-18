import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DineinordersService } from './dineinorders.service';
import { CreateDineinorderDto } from './dto/create-dineinorder.dto';
import { UpdateDineinorderDto } from './dto/update-dineinorder.dto';
import { Public } from 'src/decorator/customize';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('dineinorders')
export class DineinordersController {
  constructor(private readonly dineinordersService: DineinordersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Tạo đơn hàng tại bàn mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateDineinorderDto,
  })
  create(@Body() createDineinorderDto: CreateDineinorderDto) {
    return this.dineinordersService.create(createDineinorderDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng tại bàn' })
  findAll() {
    return this.dineinordersService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Lấy đơn hàng tại bàn theo id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dineinordersService.findOne(+id);
  }

  @Public()
  @ApiOperation({ summary: 'Cập nhật đơn hàng tại bàn' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDineinorderDto: UpdateDineinorderDto,
  ) {
    return this.dineinordersService.update(+id, updateDineinorderDto);
  }

  @Public()
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dineinordersService.remove(+id);
  }
}
