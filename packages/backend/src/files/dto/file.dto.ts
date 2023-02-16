import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import {
	FileCreateSchema,
	FileRelationKey,
	FileRelationKeyEnum,
} from '@self/utils';
import { Exactly } from 'src/types/exactly.type';

export class FileDto {
	constructor(obj: NonNullable<ListObjectsV2Output['Contents']>[0]) {
		Object.assign(this, obj);
		if (!obj.Key) {
			throw new InternalServerErrorException('Error in FileDto, invalid key');
		}
		this.id = obj.Key;
		this.key = obj.Key;
		this.size = obj.Size ?? 0;
	}

	id: string;

	// TODO rm duplicate, use id instead
	key: string;

	size: number;
}

export class CreateFileDto
	implements
		Exactly<
			Omit<FileCreateSchema, 'file'> & { file: Express.Multer.File },
			CreateFileDto
		>
{
	fileName: string;
	relationValue: string;

	@ApiProperty({ enum: FileRelationKeyEnum, enumName: 'FileRelationKeyEnum' })
	relationKey: FileRelationKey;

	@ApiProperty({ type: 'string', format: 'binary' })
	file: Express.Multer.File;
}
