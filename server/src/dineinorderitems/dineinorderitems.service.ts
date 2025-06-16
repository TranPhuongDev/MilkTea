import { Injectable } from '@nestjs/common';
import { CreateDineinorderitemDto } from './dto/create-dineinorderitem.dto';
import { UpdateDineinorderitemDto } from './dto/update-dineinorderitem.dto';

@Injectable()
export class DineinorderitemsService {
  create(createDineinorderitemDto: CreateDineinorderitemDto) {
    return 'This action adds a new dineinorderitem';
  }

  findAll() {
    return `This action returns all dineinorderitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dineinorderitem`;
  }

  update(id: number, updateDineinorderitemDto: UpdateDineinorderitemDto) {
    return `This action updates a #${id} dineinorderitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} dineinorderitem`;
  }
}
