import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

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

export class CreateDineinorderDto {
  @ApiProperty({ example: 0 })
  @IsNotEmpty({ message: 'Table không được để trống' })
  tableID: number;

  @ApiProperty({ example: 4 })
  @IsNotEmpty({ message: 'Tổng tiền không được để trống' })
  totalAmount: number;

  @ApiPropertyOptional({
    enum: OrderStatus,
    description: 'Trạng thái ban đầu của đơn hàng',
    example: OrderStatus.Pending,
  })
  @IsEnum(OrderStatus)
  @IsNotEmpty({ message: 'Ghi chú không được để trống' })
  orderStatus: string;

  @ApiPropertyOptional({
    enum: MethodPayment,
    description: 'Phương thức thanh toán',
    example: MethodPayment.Cash,
  })
  @IsEnum(MethodPayment)
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  paymentMethod: string;

  @ApiProperty({ example: 'Ghi chú về đơn hàng' })
  @IsNotEmpty({ message: 'Ghi chú không được để trống' })
  notes: string;
}
