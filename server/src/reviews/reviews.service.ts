import { BadGatewayException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const product = await this.productsService.findID(
      createReviewDto.productId,
    );

    const user = await this.usersService.findID(createReviewDto.userId);

    const createReview = await this.reviewRepository.create({
      ...createReviewDto,
      productId: product.productId,
      userId: user.userId,
    });

    return await this.reviewRepository.save(createReview);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    const findReview = await this.reviewRepository.findOne({
      where: { reviewId: id },
    });

    if (!findReview) {
      throw new BadGatewayException('Không tìm thấy đánh giá');
    }

    return findReview;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const findReview = await this.findOne(id);

    let productId = findReview.product;
    let userId = findReview.user;

    if (updateReviewDto.productId) {
      productId = await this.productsService.findID(updateReviewDto.productId);
    }

    if (updateReviewDto.userId) {
      userId = await this.usersService.findID(updateReviewDto.userId);
    }

    const createReview = await this.reviewRepository.create({
      ...findReview,
      rating: updateReviewDto.rating,
      comment: updateReviewDto.comment,
      product: productId,
      user: userId,
    });

    return await this.reviewRepository.save(createReview);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    const result = await this.reviewRepository.remove(review);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
