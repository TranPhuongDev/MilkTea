// src/dineinorderitems/dto/create-dine-in-order-item.dto.ts
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // Nếu bạn dùng Swagger

// Enum cho trạng thái của từng món hàng (có thể định nghĩa ở file riêng hoặc dùng lại nếu đã có)
enum ItemStatus {
  Pending = 'Đang chờ',
  Preparing = 'Đang pha chế',
  Ready = 'Đã xong',
  Served = 'Đã phục vụ',
  Cancelled = 'Đã hủy',
}

export class CreateDineinorderitemDto {
  @ApiProperty({
    description: 'ID của sản phẩm (trà sữa, ăn vặt)',
    example: 101,
  })
  @IsInt({ message: 'ProductId phải là số nguyên.' })
  productId: number;

  @ApiProperty({
    description: 'ID của đơn hàng trong bàng',
    example: 101,
  })
  @IsNumber({}, { message: 'DineInOrderId phải là số.' })
  dineInOrderId: number;

  @ApiProperty({ description: 'Số lượng của sản phẩm này', example: 1 })
  @IsInt({ message: 'Quantity phải là số nguyên.' })
  @Min(1, { message: 'Quantity phải lớn hơn hoặc bằng 1.' })
  quantity: number;

  @ApiProperty({
    description:
      'Giá đơn vị của sản phẩm tại thời điểm đặt (trước khi tính tổng cho số lượng)',
    example: 45000.0,
  })
  @IsNumber({}, { message: 'UnitPrice phải là số.' })
  @Min(0, { message: 'UnitPrice không thể âm.' })
  unitPrice: number;

  @ApiProperty({ description: 'tổng tiền' })
  @IsNumber({}, { message: 'TotalPrice phải là số.' })
  @Min(0, { message: 'TotalPrice không thể âm.' })
  totalPrice: number;

  @ApiPropertyOptional({
    description:
      'Chuỗi JSON mô tả các tùy chọn đã chọn (ví dụ: {"size":"L", "sugar":"70%", "toppings":["tranchau"]})',
    example: '{"size":"L", "sugar":"70%","toppings":["Trân châu đen"]}',
    type: 'string', // Đặt là string vì lưu JSON
  })
  @IsString({ message: 'SelectedOptions phải là chuỗi JSON hợp lệ.' })
  @IsOptional()
  selectedOptions?: string;

  @ApiPropertyOptional({
    description: 'Ghi chú riêng cho món này',
    example: 'Thêm đá',
  })
  @IsString({ message: 'Notes phải là chuỗi ký tự.' })
  @IsOptional()
  notes?: string;

  // Trạng thái món hàng thường do backend quản lý, nhưng có thể cho phép thiết lập ban đầu nếu có quy trình cụ thể
  @ApiPropertyOptional({
    enum: ItemStatus,
    description: 'Trạng thái ban đầu của món hàng',
    example: ItemStatus.Pending,
  })
  @IsString({ message: 'ItemStatus phải là chuỗi.' })
  @IsOptional()
  itemStatus?: ItemStatus; // Có thể bỏ nếu luôn mặc định ở backend
}
