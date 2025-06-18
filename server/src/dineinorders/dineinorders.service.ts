import { BadGatewayException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDineinorderDto } from './dto/create-dineinorder.dto';
import { UpdateDineinorderDto } from './dto/update-dineinorder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DineInOrder } from './entities/dineinorder.entity';
import { Repository } from 'typeorm';
import { TablesService } from 'src/tables/tables.service';

@Injectable()
export class DineinordersService {
  constructor(
    @InjectRepository(DineInOrder)
    private dineInOrderRepository: Repository<DineInOrder>,
    private tablesService: TablesService,
  ) {}

  async create(createDineinorderDto: CreateDineinorderDto) {
    const tableId = await this.tablesService.findOne(
      +createDineinorderDto.tableID,
    );
    const newDineInOrder = await this.dineInOrderRepository.create({
      ...createDineinorderDto,
      tableId: tableId.tableId,
    });

    return await this.dineInOrderRepository.save(newDineInOrder);
  }

  async findAll() {
    const dineinorders = await this.dineInOrderRepository.find();
    return dineinorders;
  }

  async findOne(id: number) {
    const findDineInOrder = await this.dineInOrderRepository.findOne({
      where: { dineInOrderId: id },
    });

    if (!findDineInOrder) {
      throw new BadGatewayException('Không tìm thấy sản phẩm');
    }

    return findDineInOrder;
  }

  async update(id: number, updateDineinorderDto: UpdateDineinorderDto) {
    const findDineInOrder = await this.dineInOrderRepository.findOne({
      where: { dineInOrderId: id },
    });

    let tableId = findDineInOrder?.table; // Giữ nguyên category hiện tại nếu không có categoryID mới

    // Kiểm tra nếu categoryID được cung cấp
    if (updateDineinorderDto.tableID) {
      tableId = await this.tablesService.findOne(+updateDineinorderDto.tableID);
    }

    const updatedDineInOrder = await this.dineInOrderRepository.create({
      ...findDineInOrder,
      ...updateDineinorderDto,
      tableId: tableId?.tableId,
    });

    return await this.dineInOrderRepository.save(updatedDineInOrder);
  }

  async remove(id: number) {
    const findDineInOrder = await this.findOne(id);
    const result = await this.dineInOrderRepository.delete(findDineInOrder);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
