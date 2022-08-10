import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';
import { IUser } from 'src/interfaces/user.interface';

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

export class FileRequestDto {
  constructor({ key, user }: { key: string; user: IUser }) {
    this.bucket = user.role.organizationId;

    this.key = key;
    // set directory to everything before the last slash
    this.directory = key.split('/').slice(0, -1).join('/');
  }

  @IsString()
  bucket: string;

  @IsString()
  key: string; // full key (directory + filename)

  @IsString()
  directory: string; // aka prefix, used as cache key
}
