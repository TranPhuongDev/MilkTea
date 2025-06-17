import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/decorator/customize';
import { Request } from 'express';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @ApiOperation({ summary: 'Tạo danh mục mới' })
  @ApiCreatedResponse({
    description: 'Tạo thành công',
    type: CreateCategoryDto,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách danh mục theo name và sort' })
  async findAll(@Req() req: Request) {
    const builder = await this.categoriesService.queryBuilder('categories');

    if (req.query.name) {
      builder.where('categories.categoryName LIKE :name', {
        name: `%${req.query.name}%`,
      });
    }

    const sort: any = req.query.sort;

    if (sort) {
      builder.orderBy('categories.categoryName', sort.toUpperCase());
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const perPage = 2;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);

    return {
      categories: await builder.getMany(),
      total,
      page,
      last_page: Math.ceil(total / perPage),
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Lấy danh mục theo id' })
  findOne(@Param('id') id: number) {
    return this.categoriesService.findID(+id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  @ApiCreatedResponse({
    description: 'Cập nhật thành công',
    type: UpdateCategoryDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Public()
  @ApiOperation({ summary: 'Xóa người dùng theo id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(+id);
  }
}
