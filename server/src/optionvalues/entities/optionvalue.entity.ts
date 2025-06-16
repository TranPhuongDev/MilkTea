// src/entities/option-value.entity.ts
import { Option } from 'src/options/entities/option.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('option_values')
export class OptionValue {
  @PrimaryGeneratedColumn()
  valueId: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: false,
  })
  priceAdjustment: number;

  @ManyToOne(() => Option, (option) => option.optionValues)
  @JoinColumn({ name: 'optionId' })
  option: Option;
  @Column()
  optionId: number; // Foreign key column
}
