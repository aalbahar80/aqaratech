import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';

export class FileDto {
  constructor(obj: NonNullable<ListObjectsV2Output['Contents']>[0]) {
    Object.assign(this, obj);
  }

  @IsString()
  Key: string;

  @IsNumber()
  Size: number;
}

export class CreateFileDto {
  @IsEnum(FileForeignKeys)
  @ApiProperty({ enum: FileForeignKeys, enumName: 'FileForeignKeys' })
  relationKey: FileForeignKeys;

  @IsID()
  relationValue: string;

  @IsString()
  fileName: string;

  @IsString()
  label?: string | null;
}
