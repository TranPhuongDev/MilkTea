import { PartialType } from '@nestjs/swagger';
import { CreateDineinorderitemDto } from './create-dineinorderitem.dto';

export class UpdateDineinorderitemDto extends PartialType(CreateDineinorderitemDto) {}
