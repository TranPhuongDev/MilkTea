import { ApiProperty } from '@nestjs/swagger';
import { Review } from 'src/reviews/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

enum Role {
  Admin,
  User,
  Guest,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({ unique: true }) // Đảm bảo email là duy nhất
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: string;

  @Column({ nullable: true })
  codeId: string;

  @Column({ nullable: true })
  codeExpired: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
