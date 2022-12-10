import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { FileRelationKey, FileRelationKeyEnum } from '@self/utils';

export class FileFindAllOptionsDto {
	@IsEnum(FileRelationKeyEnum)
	@ApiProperty({ enum: FileRelationKeyEnum, enumName: 'FileRelationKeyEnum' })
	relationKey: FileRelationKey;

	@IsString()
	relationValue: string;
}

export class FileFindOneOptionsDto {
	@IsString()
	key: string;
}
