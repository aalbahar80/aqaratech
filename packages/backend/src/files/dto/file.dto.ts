import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { fileCreateSchema, FileRelationKeyEnum } from '@self/utils';
import { IsNumber, IsString } from 'class-validator';
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
