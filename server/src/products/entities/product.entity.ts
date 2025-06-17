import { Category } from 'src/categories/entities/category.entity';
import { DineInOrderItem } from 'src/dineinorderitems/entities/dineinorderitem.entity';
import { ProductOption } from 'src/intermediatetable/product-option.entity';
import { Option } from 'src/options/entities/option.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum status {
  Outofstock,
  Instock,
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ unique: true })
  productName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: status, default: status.Instock })
  status: string;

  @Column({ default: false })
  IsFeatured: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  categorys: Category;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => DineInOrderItem, (item) => item.product)
  dineInOrderItems: DineInOrderItem[];

  @OneToMany(() => ProductOption, (productOption) => productOption.product)
  productOptions: ProductOption[];
}
