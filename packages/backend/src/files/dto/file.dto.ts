import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { DBEntitiesMap, entitiesMap } from '@self/utils';
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

    // use getters instead?
    const relationKey = directory.split('/')[0] as FileForeignKeys; // TODO don't cast?
    this.entity = entitiesMap[relationKey].caslName;

    this.entityId = directory.split('/')[1];
  }

  @IsString()
  bucket: string;

  @IsString()
  directory: string; // aka prefix, used as cache key

  @IsString()
  entity: DBEntitiesMap['caslName']; // for ability check

  @IsID()
  entityId: string; // for ability check
}

export class FileRequestDto extends DirectoryRequestDto {
  constructor({ key, user }: { key: string; user: IUser }) {
    // set directory to everything before the last slash
    console.log({ key }, 'file.dto.ts ~ 49');
    const directory = key.split('/').slice(0, -1).join('/');
    console.log({ directory }, 'file.dto.ts ~ 50');
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

  // TODO check name has no delimiters (:/ or whitespace)
  @IsString()
  fileName: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @Expose({ toClassOnly: true })
  get fileRequestDto(): FileRequestDto {
    const key = `${this.relationKey}/${this.relationValue}/${this.fileName}`; // TODO dedupe
    return new FileRequestDto({
      key: key,
      user: { role: { organizationId: this.organizationId } } as IUser, // TODO just pass string
    });
  }
}
