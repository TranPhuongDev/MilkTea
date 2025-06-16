import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DineinorderitemsService } from './dineinorderitems.service';
import { CreateDineinorderitemDto } from './dto/create-dineinorderitem.dto';
import { UpdateDineinorderitemDto } from './dto/update-dineinorderitem.dto';

@Controller('dineinorderitems')
export class DineinorderitemsController {
  constructor(private readonly dineinorderitemsService: DineinorderitemsService) {}

  @Post()
  create(@Body() createDineinorderitemDto: CreateDineinorderitemDto) {
    return this.dineinorderitemsService.create(createDineinorderitemDto);
  }

  @Get()
  findAll() {
    return this.dineinorderitemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dineinorderitemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDineinorderitemDto: UpdateDineinorderitemDto) {
    return this.dineinorderitemsService.update(+id, updateDineinorderitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dineinorderitemsService.remove(+id);
  }
}
