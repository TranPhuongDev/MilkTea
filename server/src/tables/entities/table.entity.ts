// src/entities/table.entity.ts
import { DineInOrder } from 'src/dineinorders/entities/dineinorder.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  tableId: number;

  @Column({ unique: true, length: 50, nullable: false })
  tableName: string;

  @Column({ nullable: true })
  capacity: number;

  @Column({ length: 100, nullable: true })
  location: string;

  @OneToMany(() => DineInOrder, (dineInOrder) => dineInOrder.table)
  dineInOrders: DineInOrder[];
}
