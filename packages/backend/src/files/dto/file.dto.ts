import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { Expose } from 'class-transformer';
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

export class DirectoryRequestDto {
  constructor({ directory, user }: { directory: string; user: IUser }) {
    this.bucket = user.role.organizationId;
    this.directory = directory;
  }

  @IsString()
  bucket: string;

  @IsString()
  directory: string; // aka prefix, used as cache key
}

export class FileRequestDto extends DirectoryRequestDto {
  constructor({ key, user }: { key: string; user: IUser }) {
    // set directory to everything before the last slash
    const directory = key.split('/').slice(0, -1).join('/');
    super({ directory, user });
    this.key = key;
  }

  @IsString()
  key: string; // full key (directory + filename)
}

export class CreateFileDto {
  // This breaks file uploads. See sdk/dist/fileApi.js
  // @ApiProperty({
  //   enum: FileForeignKeys,
  //   enumName: 'FileForeignKeys',
  // })

  @IsID()
  organizationId: string;

  @IsEnum(FileForeignKeys)
  relationKey: FileForeignKeys;

  @IsID()
  relationValue: string;

  @IsString()
  fileName: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @Expose({ toClassOnly: true })
  get bucket(): string {
    return this.organizationId;
  }

  @Expose({ toClassOnly: true })
  get directory(): string {
    return `${this.relationKey}/${this.relationValue}`;
  }

  @Expose({ toClassOnly: true })
  get key(): string {
    return `${this.directory}/${this.fileName}`;
  }
}
