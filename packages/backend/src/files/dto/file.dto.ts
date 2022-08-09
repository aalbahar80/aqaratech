import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
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
  // This breaks file uploads. See sdk/dist/fileApi.js
  // @ApiProperty({
  //   enum: FileForeignKeys,
  //   enumName: 'FileForeignKeys',
  // })

  @IsEnum(FileForeignKeys)
  relationKey: FileForeignKeys;

  @IsID()
  relationValue: string;

  @IsString()
  fileName: string;

  @IsString()
  @IsOptional()
  label?: string | null;
}
