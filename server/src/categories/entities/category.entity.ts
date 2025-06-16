import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ unique: true })
  categoryName: string;

  @OneToMany(() => Product, (product) => product.categorys)
  products: Product[];
}
