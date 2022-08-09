import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { IsNumber, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';

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
  // @ApiProperty({
  //   enum: FileForeignKeys,
  //   enumName: 'FileForeignKeys',
  // })
  // @IsEnum(FileForeignKeys)
  // relationValue: FileForeignKeys;

  @IsID()
  relationKey: string;

  @IsID()
  relationValue: string;

  @IsString()
  fileName: string;

  @IsString()
  label?: string | null;
}
