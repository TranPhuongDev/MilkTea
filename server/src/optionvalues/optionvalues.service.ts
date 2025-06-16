import { Injectable } from '@nestjs/common';
import { CreateOptionvalueDto } from './dto/create-optionvalue.dto';
import { UpdateOptionvalueDto } from './dto/update-optionvalue.dto';

@Injectable()
export class OptionvaluesService {
  create(createOptionvalueDto: CreateOptionvalueDto) {
    return 'This action adds a new optionvalue';
  }

  findAll() {
    return `This action returns all optionvalues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionvalue`;
  }

  update(id: number, updateOptionvalueDto: UpdateOptionvalueDto) {
    return `This action updates a #${id} optionvalue`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionvalue`;
  }
}
