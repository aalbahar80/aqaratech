import { PickType } from '@nestjs/swagger';
import { CreateFileDto } from 'src/files/dto/file.dto';

export class FileFindAllOptionsDto extends PickType(CreateFileDto, [
  'relationKey',
  'relationValue',
]) {}
