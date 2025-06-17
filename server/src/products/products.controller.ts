import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/decorator/customize';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto }) // 👈 Thay cho khai báo thủ công
  @UseInterceptors(FileInterceptor('avatar')) // 👈 Tên trùng với field DTO
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Public()
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm theo name và sort' })
  @Get()
  async findAll(@Req() req: Request) {
    const builder = await this.productsService.queryBuilder('products');

    if (req.query.name) {
      builder.where('products.productName LIKE :name', {
        name: `%${req.query.name}%`,
      });
    }

    const sort: any = req.query.sort;

    if (sort) {
      builder.orderBy('products.productName', sort.toUpperCase());
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const perPage = 2;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);

    return {
      products: await builder.getMany(),
      total,
      page,
      last_page: Math.ceil(total / perPage),
    };
  }

  @Public()
  @ApiOperation({ summary: 'Lấy sản phẩm theo id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findID(+id);
  }

  @Public()
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateProductDto,
  })
  @ApiBadRequestResponse({ description: 'Cập nhật thất bại' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa sản phẩm theo Id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
