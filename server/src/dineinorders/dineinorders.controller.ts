import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DineinordersService } from './dineinorders.service';
import { CreateDineinorderDto } from './dto/create-dineinorder.dto';
import { UpdateDineinorderDto } from './dto/update-dineinorder.dto';

@Controller('dineinorders')
export class DineinordersController {
  constructor(private readonly dineinordersService: DineinordersService) {}

  @Post()
  create(@Body() createDineinorderDto: CreateDineinorderDto) {
    return this.dineinordersService.create(createDineinorderDto);
  }

  @Get()
  findAll() {
    return this.dineinordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dineinordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDineinorderDto: UpdateDineinorderDto) {
    return this.dineinordersService.update(+id, updateDineinorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dineinordersService.remove(+id);
  }
}
