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

  @Column({ length: 50, default: 'Đang chờ', nullable: false })
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
