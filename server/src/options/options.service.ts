import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async checkNameExists(name: string): Promise<boolean> {
    return this.optionRepository.exists({ where: { name: name } });
  }

  async create(createOptionDto: CreateOptionDto) {
    const { name, type, isRequired } = createOptionDto;
    //check name
    const isNameExist = await this.checkNameExists(name);

    if (isNameExist) {
      throw new BadRequestException(`Tên tùy chọn đã tồn tại: ${name}`);
    }

    return await this.optionRepository.save(createOptionDto);
  }

  async findAll() {
    const options = await this.optionRepository.find();
    return options;
  }

  async findOne(id: number) {
    const findOpt = await this.optionRepository.findOne({
      where: { optionId: id },
      relations: ['optionValues'],
    });

    if (!findOpt) throw new BadGatewayException('Không tìm thấy danh mục');

    return findOpt;
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    const findOpt = await this.optionRepository.findOne({
      where: { optionId: id },
    });

    if (!findOpt) {
      throw new BadGatewayException('Không tìm thấy tùy chọn');
    }

    if (updateOptionDto.name && findOpt.name != updateOptionDto.name) {
      const isNameExist = await this.checkNameExists(updateOptionDto.name);

      if (isNameExist) {
        throw new BadRequestException(
          `Tên sản phẩm đã tồn tại bạn vui lòng cập nhật tên khác: ${updateOptionDto.name}`,
        );
      }
    }
    const createOpt = await this.optionRepository.create({
      ...findOpt,
      ...updateOptionDto,
      // option 2: nếu muốn cập nhật từng trường
      // name: updateOptionDto.name,
      // type: updateOptionDto.type,
      // isRequired: updateOptionDto.isRequired,
    });

    const updateOpt = await this.optionRepository.save(createOpt);
    return updateOpt;
  }

  async remove(id: number) {
    const opt = await this.optionRepository.findOneBy({ optionId: id });
    if (!opt) {
      throw new BadRequestException(`Tùy chọn ${id} không tìm thấy`);
    }
    const result = await this.optionRepository.remove(opt);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
