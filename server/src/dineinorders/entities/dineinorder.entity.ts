// src/entities/dine-in-order.entity.ts
import { DineInOrderItem } from 'src/dineinorderitems/entities/dineinorderitem.entity';
import { Table } from 'src/tables/entities/table.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('dine_in_orders')
export class DineInOrder {
  @PrimaryGeneratedColumn()
  dineInOrderId: number;

  @Column({ nullable: false })
  tableId: number;

  @CreateDateColumn()
  orderTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalAmount: number;

  @Column({ length: 50, default: 'Đang chờ', nullable: false })
  orderStatus: string;

  @Column({ length: 50, nullable: true })
  paymentMethod: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Table, (table) => table.dineInOrders)
  @JoinColumn({ name: 'tableId' })
  table: Table;

  @OneToMany(() => DineInOrderItem, (item) => item.dineInOrder)
  dineInOrderItems: DineInOrderItem[];
}
