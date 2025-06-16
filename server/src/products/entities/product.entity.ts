import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productID: number;

  @Column({ unique: true })
  productName: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  unit: string;

  @ManyToOne(() => Category, (category) => category.productID)
  @JoinColumn({ name: 'categoryID' })
  categoryID: Category;
}
