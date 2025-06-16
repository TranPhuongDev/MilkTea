import { Injectable } from '@nestjs/common';
import { CreateDineinorderDto } from './dto/create-dineinorder.dto';
import { UpdateDineinorderDto } from './dto/update-dineinorder.dto';

@Injectable()
export class DineinordersService {
  create(createDineinorderDto: CreateDineinorderDto) {
    return 'This action adds a new dineinorder';
  }

  findAll() {
    return `This action returns all dineinorders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dineinorder`;
  }

  update(id: number, updateDineinorderDto: UpdateDineinorderDto) {
    return `This action updates a #${id} dineinorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} dineinorder`;
  }
}
