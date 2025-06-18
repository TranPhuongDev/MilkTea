// src/entities/dine-in-order-item.entity.ts
import { DineInOrder } from 'src/dineinorders/entities/dineinorder.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

enum ItemStatus {
  Pending = 'Đang chờ',
  Preparing = 'Đang pha chế',
  Ready = 'Đã xong',
  Served = 'Đã phục vụ',
  Cancelled = 'Đã hủy',
}

@Entity('dine_in_order_items')
export class DineInOrderItem {
  @PrimaryGeneratedColumn()
  dineInOrderItemId: number;

  @Column({ nullable: false })
  dineInOrderId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalPrice: number;

  @Column({ type: 'text', nullable: true })
  selectedOptions: string;

  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.Pending,
    nullable: false,
  })
  itemStatus: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => DineInOrder, (order) => order.dineInOrderItems)
  @JoinColumn({ name: 'dineInOrderId' })
  dineInOrder: DineInOrder;

  @ManyToOne(() => Product, (product) => product.dineInOrderItems)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
