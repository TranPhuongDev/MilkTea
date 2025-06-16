// src/entities/option.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { OptionValue } from 'src/optionvalues/entities/optionvalue.entity';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn()
  optionId: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  type: string;

  @Column({ default: false, nullable: false })
  isRequired: boolean;

  @OneToMany(() => OptionValue, (optionValue) => optionValue.option)
  optionValues: OptionValue[];

  @ManyToMany(() => Product, (product) => product.options)
  products: Product[];
}
