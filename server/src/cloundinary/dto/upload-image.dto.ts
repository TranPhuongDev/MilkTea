// src/cloudinary/dto/upload-image.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
