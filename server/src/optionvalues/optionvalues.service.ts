import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateOptionvalueDto } from './dto/create-optionvalue.dto';
import { UpdateOptionvalueDto } from './dto/update-optionvalue.dto';
import { Repository } from 'typeorm';
import { OptionValue } from './entities/optionvalue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionsService } from 'src/options/options.service';

@Injectable()
export class OptionvaluesService {
  constructor(
    @InjectRepository(OptionValue)
    private optionValueRepository: Repository<OptionValue>,
    private optionService: OptionsService,
  ) {}

  async checkNameExists(name: string): Promise<boolean> {
    return await this.optionValueRepository.exists({
      where: { name: name },
    });
  }

  async create(createOptionvalueDto: CreateOptionvalueDto) {
    //check name
    const isNameExist = await this.checkNameExists(createOptionvalueDto.name);

    if (isNameExist) {
      throw new BadRequestException(
        `Giá trị tùy chọn đã tồn tại: ${createOptionvalueDto.name}`,
      );
    }

    const optId = await this.optionService.findOne(
      +createOptionvalueDto.optionId,
    );

    // Tạo đối tượng Product
    const createOptionValue = this.optionValueRepository.create({
      ...createOptionvalueDto,
      option: optId, // Lấy optionId từ đối tượng Option
    });

    return await this.optionValueRepository.save(createOptionValue);
  }

  async findAll() {
    return this.optionValueRepository.find();
  }

  async findOne(id: number) {
    const findVal = await this.optionValueRepository.findOne({
      where: { valueId: id },
    });

    if (!findVal) {
      throw new BadGatewayException('Không tìm thấy giá trị tùy chọn');
    }

    return findVal;
  }

  async update(id: number, updateOptionvalueDto: UpdateOptionvalueDto) {
    const findValId = await this.findOne(id);

    if (
      updateOptionvalueDto.name &&
      findValId.name != updateOptionvalueDto.name
    ) {
      const isNameExist = await this.checkNameExists(updateOptionvalueDto.name);

      if (isNameExist) {
        throw new BadRequestException(
          `Giá trị tùy chọn đã tồn tại bạn vui lòng cập nhật tên khác: ${updateOptionvalueDto.name}`,
        );
      }
    }

    let optId = findValId.option;

    if (updateOptionvalueDto.optionId) {
      optId = await this.optionService.findOne(+updateOptionvalueDto.optionId);
    }

    // Tạo đối tượng Product
    const createVal = this.optionValueRepository.create({
      ...findValId,
      name: updateOptionvalueDto.name,
      priceAdjustment: updateOptionvalueDto.priceAdjustment,
      option: optId, // Lấy optionId từ đối tượng Option
    });

    return this.optionValueRepository.save(createVal);
  }

  async remove(id: number) {
    const pro = await this.findOne(id);
    const result = await this.optionValueRepository.remove(pro);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
