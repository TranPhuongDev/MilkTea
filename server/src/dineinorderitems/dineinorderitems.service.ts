import { BadGatewayException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDineinorderitemDto } from './dto/create-dineinorderitem.dto';
import { UpdateDineinorderitemDto } from './dto/update-dineinorderitem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DineInOrderItem } from './entities/dineinorderitem.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { DineinordersService } from 'src/dineinorders/dineinorders.service';

@Injectable()
export class DineinorderitemsService {
  constructor(
    @InjectRepository(DineInOrderItem)
    private orderItemRepository: Repository<DineInOrderItem>,
    private productService: ProductsService,
    private dineinordersService: DineinordersService,
  ) {}

  async create(createDineinorderitemDto: CreateDineinorderitemDto) {
    const product = await this.productService.findID(
      createDineinorderitemDto.productId,
    );
    const order = await this.dineinordersService.findOne(
      createDineinorderitemDto.dineInOrderId,
    );

    const createOrderItem = await this.orderItemRepository.create({
      ...createDineinorderitemDto,
      product: product,
      dineInOrder: order,
    });

    return await this.orderItemRepository.save(createOrderItem);
  }

  async findAll() {
    return this.orderItemRepository.find();
  }

  async findOne(id: number) {
    const findOrderItem = await this.orderItemRepository.findOne({
      where: { dineInOrderItemId: id },
    });

    if (!findOrderItem) {
      throw new BadGatewayException('Không tìm thấy sản phẩm');
    }

    return findOrderItem;
  }

  async update(id: number, updateDineinorderitemDto: UpdateDineinorderitemDto) {
    const findOrderItem = await this.findOne(id);

    let productId = findOrderItem.product;
    let dineInOrderId = findOrderItem.dineInOrder;

    if (updateDineinorderitemDto.productId) {
      productId = await this.productService.findID(
        updateDineinorderitemDto.productId,
      );
    }

    if (updateDineinorderitemDto.dineInOrderId) {
      dineInOrderId = await this.dineinordersService.findOne(
        updateDineinorderitemDto.dineInOrderId,
      );
    }

    const createOrderItem = await this.orderItemRepository.create({
      ...findOrderItem,
      quantity: updateDineinorderitemDto.quantity,
      unitPrice: updateDineinorderitemDto.unitPrice,
      totalPrice: updateDineinorderitemDto.totalPrice,
      selectedOptions: updateDineinorderitemDto.selectedOptions,
      itemStatus: updateDineinorderitemDto.itemStatus,
      notes: updateDineinorderitemDto.notes,
      product: productId,
      dineInOrder: dineInOrderId,
    });

    return await this.orderItemRepository.save(createOrderItem);
  }

  async remove(id: number) {
    const pro = await this.findOne(id);
    const result = await this.orderItemRepository.remove(pro);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
