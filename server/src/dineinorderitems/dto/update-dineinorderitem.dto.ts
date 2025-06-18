import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDineinorderitemDto } from './create-dineinorderitem.dto';
import { IsOptional, Min } from 'class-validator';

enum ItemStatus {
  Pending = 'Đang chờ',
  Preparing = 'Đang pha chế',
  Ready = 'Đã xong',
  Served = 'Đã phục vụ',
  Cancelled = 'Đã hủy',
}

export class UpdateDineinorderitemDto {
  @ApiProperty({
    description: 'ID của sản phẩm (trà sữa, ăn vặt)',
    example: 101,
  })
  @IsOptional()
  productId: number;

  @ApiProperty({
    description: 'ID của đơn hàng trong bàng',
    example: 101,
  })
  @IsOptional()
  dineInOrderId: number;

  @ApiProperty({ description: 'Số lượng của sản phẩm này', example: 1 })
  @IsOptional()
  quantity: number;

  @ApiProperty({
    description:
      'Giá đơn vị của sản phẩm tại thời điểm đặt (trước khi tính tổng cho số lượng)',
    example: 45000.0,
  })
  @IsOptional()
  unitPrice: number;

  @ApiProperty({ description: 'tổng tiền' })
  @IsOptional()
  @Min(0, { message: 'TotalPrice không thể âm.' })
  totalPrice: number;

  @ApiPropertyOptional({
    description:
      'Chuỗi JSON mô tả các tùy chọn đã chọn (ví dụ: {"size":"L", "sugar":"70%", "toppings":["tranchau"]})',
    example: '{"size":"L", "sugar":"70%","toppings":["Trân châu đen"]}',
    type: 'string', // Đặt là string vì lưu JSON
  })
  @IsOptional()
  selectedOptions?: string;

  @ApiPropertyOptional({
    description: 'Ghi chú riêng cho món này',
    example: 'Thêm đá',
  })
  @IsOptional()
  notes?: string;

  // Trạng thái món hàng thường do backend quản lý, nhưng có thể cho phép thiết lập ban đầu nếu có quy trình cụ thể
  @ApiPropertyOptional({
    enum: ItemStatus,
    description: 'Trạng thái ban đầu của món hàng',
    example: ItemStatus.Pending,
  })
  @IsOptional()
  itemStatus?: ItemStatus; // Có thể bỏ nếu luôn mặc định ở backend
}
