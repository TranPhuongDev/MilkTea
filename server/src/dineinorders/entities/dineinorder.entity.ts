// src/entities/dine-in-order.entity.ts
import { DineInOrderItem } from 'src/dineinorderitems/entities/dineinorderitem.entity';
import { Table } from 'src/tables/entities/table.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

enum MethodPayment {
  Cash = 'Tiền mặt',
  Card = 'Thẻ tín dụng',
  MobilePayment = 'Thanh toán di động',
  Other = 'Khác',
}

enum OrderStatus {
  Pending = 'Đang chờ',
  Completed = 'Đã hoàn thành',
}

@Entity('dine_in_orders')
export class DineInOrder {
  @PrimaryGeneratedColumn()
  dineInOrderId: number;

  @Column({ nullable: false })
  tableId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  orderStatus: string;

  @Column({ type: 'enum', enum: MethodPayment, default: MethodPayment.Cash })
  paymentMethod: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Table, (table) => table.dineInOrders)
  @JoinColumn({ name: 'tableId' })
  table: Table;

  @OneToMany(() => DineInOrderItem, (item) => item.dineInOrder)
  dineInOrderItems: DineInOrderItem[];
}
