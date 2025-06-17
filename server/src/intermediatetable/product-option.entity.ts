// src/entities/product-option.entity.ts
import { Option } from 'src/options/entities/option.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('product_options') // Tên bảng trung gian trong CSDL
export class ProductOption {
  @PrimaryGeneratedColumn()
  productOptionId: number; // Khóa chính tự tăng của bảng trung gian

  @Column()
  productId: number; // Cột khóa ngoại thực tế

  @Column()
  optionId: number; // Cột khóa ngoại thực tế

  // Mối quan hệ Many-to-One với Product
  @ManyToOne(() => Product, (product) => product.productOptions)
  @JoinColumn({ name: 'productId' }) // Khóa ngoại trỏ đến Product
  product: Product;

  // Mối quan hệ Many-to-One với Option
  @ManyToOne(() => Option, (option) => option.productOptions)
  @JoinColumn({ name: 'optionId' }) // Khóa ngoại trỏ đến Option
  option: Option;
}
