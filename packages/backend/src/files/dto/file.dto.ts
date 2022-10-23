import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
	DBEntitiesMap,
	entitiesMap,
	fileCreateSchema,
	FileRelationKeyEnum,
} from '@self/utils';
import { IsNumber, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';
import { IUser } from 'src/interfaces/user.interface';
import { z } from 'zod';

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

export class CreateFileDto implements z.infer<typeof fileCreateSchema> {
	file: Express.Multer.File;
	organizationId: string; // TODO rm
	fileName: string;
	relationValue: string;

	// TODO: can infer? or use typeof FileRelationKeyEnum?
	@ApiProperty({ enum: FileRelationKeyEnum, enumName: 'FileRelationKeyEnum' })
	relationKey:
		| 'tenant'
		| 'portfolio'
		| 'property'
		| 'unit'
		| 'lease'
		| 'leaseInvoice'
		| 'expense'
		| 'maintenanceOrder';
}
