import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';

export class FileFindAllOptionsDto {
  @IsEnum(FileForeignKeys)
  @ApiProperty({ enum: FileForeignKeys, enumName: 'FileForeignKeys' })
  relationKey: FileForeignKeys;

  @IsID()
  relationValue: string;
}
