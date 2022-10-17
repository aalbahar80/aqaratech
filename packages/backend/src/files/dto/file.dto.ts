import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DBEntitiesMap, entitiesMap } from '@self/utils';
import { Expose } from 'class-transformer';
import { Allow, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';
import { IUser } from 'src/interfaces/user.interface';

export class FileDto {
	constructor(obj: NonNullable<ListObjectsV2Output['Contents']>[0]) {
		Object.assign(this, obj);
		if (!obj.Key) {
			throw new InternalServerErrorException('Error in FileDto, invalid key');
		}
		this.key = obj.Key;
		this.size = obj.Size ?? 0;
	}

	@IsString()
	key: string;

	@IsNumber()
	size: number;
}

export class DirectoryRequestDto {
	constructor({ directory, user }: { directory: string; user: IUser }) {
		this.bucket = user.role.organizationId;
		this.directory = directory;

		// use getters instead?
		const relationKey = directory.split('/')[0] as FileForeignKeys; // TODO don't cast?
		this.entity = entitiesMap[relationKey].singular;

		this.entityId = directory.split('/')[1];
	}

	@IsString()
	bucket: string;

	@IsString()
	directory: string; // aka prefix, used as cache key

	@IsString()
	entity: DBEntitiesMap['singular']; // for ability check

	@IsID()
	entityId: string; // for ability check
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
	@IsID()
	organizationId: string;

	@ApiProperty({
		type: 'string',
		enum: FileForeignKeys,
		// Setting an enum name will cause these issues:
		// https://github.com/OpenAPITools/openapi-generator/issues/11613
		// https://github.com/OpenAPITools/openapi-generator/issues/9897
		// enumName: 'FileForeignKeys',
	})
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

	@Allow()
	@ApiProperty({ type: 'string', format: 'binary' })
	file: Express.Multer.File;
}
