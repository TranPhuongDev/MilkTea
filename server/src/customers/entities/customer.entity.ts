import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customerID: number;

  @Column()
  customerName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

}
