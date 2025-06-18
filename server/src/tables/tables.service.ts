import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async checkNameExists(name: string): Promise<boolean> {
    return this.tableRepository.exists({ where: { tableName: name } });
  }

  async create(createTableDto: CreateTableDto) {
    //check name
    const isNameExist = await this.checkNameExists(createTableDto.tableName);

    if (isNameExist) {
      throw new BadRequestException(
        `Tên bàn đã tồn tại: ${createTableDto.tableName}`,
      );
    }

    return await this.tableRepository.save(createTableDto);
  }

  async findAll() {
    const tables = await this.tableRepository.find();
    return tables;
  }

  async findOne(id: number) {
    const findTable = await this.tableRepository.findOne({
      where: { tableId: id },
      relations: ['dineInOrders'],
    });

    if (!findTable) throw new BadGatewayException('Không tìm thấy danh mục');

    return findTable;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const findTable = await this.tableRepository.findOne({
      where: { tableId: id },
    });

    if (!findTable) {
      throw new BadRequestException('Không tìm thấy danh mục ');
    }

    if (
      updateTableDto.tableName &&
      findTable.tableName != updateTableDto.tableName
    ) {
      const isNameExist = await this.checkNameExists(updateTableDto.tableName);

      if (isNameExist) {
        throw new BadRequestException(
          `Tên bàn đã tồn tại bạn vui lòng cập nhật tên khác: ${updateTableDto.tableName}`,
        );
      }
    }
    const createTable = await this.tableRepository.create({
      ...findTable,
      tableName: updateTableDto.tableName,
      capacity: updateTableDto.capacity,
      location: updateTableDto.location,
    });

    const updateCate = await this.tableRepository.save(createTable);
    return updateCate;
  }

  async remove(id: number) {
    const table = await this.tableRepository.findOneBy({ tableId: id });
    if (!table) {
      throw new BadRequestException(`Danh mục ${id} không tìm thấy`);
    }
    const result = await this.tableRepository.remove(table);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
