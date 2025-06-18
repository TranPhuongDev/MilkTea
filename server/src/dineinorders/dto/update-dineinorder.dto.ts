import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Table } from 'src/tables/entities/table.entity';

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

export class UpdateDineinorderDto {
  @ApiProperty({ example: '0' })
  @IsOptional()
  tableID: Table;

  @ApiProperty({ example: 100000 })
  @IsOptional()
  totalAmount: number;

  @ApiPropertyOptional({
    enum: OrderStatus,
    description: 'Trạng thái ban đầu của đơn hàng',
    example: OrderStatus.Pending,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  orderStatus: string;

  @ApiPropertyOptional({
    enum: MethodPayment,
    description: 'Phương thức thanh toán',
    example: MethodPayment.Cash,
  })
  @IsEnum(MethodPayment)
  @IsOptional()
  paymentMethod: string;

  @ApiProperty({ example: 'Ghi chú về đơn hàng' })
  @IsOptional()
  notes: string;
}
