import { PartialType } from '@nestjs/swagger';
import { CreateDineinorderDto } from './create-dineinorder.dto';

export class UpdateDineinorderDto extends PartialType(CreateDineinorderDto) {}
