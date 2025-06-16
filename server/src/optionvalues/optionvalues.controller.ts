import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionvaluesService } from './optionvalues.service';
import { CreateOptionvalueDto } from './dto/create-optionvalue.dto';
import { UpdateOptionvalueDto } from './dto/update-optionvalue.dto';

@Controller('optionvalues')
export class OptionvaluesController {
  constructor(private readonly optionvaluesService: OptionvaluesService) {}

  @Post()
  create(@Body() createOptionvalueDto: CreateOptionvalueDto) {
    return this.optionvaluesService.create(createOptionvalueDto);
  }

  @Get()
  findAll() {
    return this.optionvaluesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionvaluesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionvalueDto: UpdateOptionvalueDto) {
    return this.optionvaluesService.update(+id, updateOptionvalueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionvaluesService.remove(+id);
  }
}
