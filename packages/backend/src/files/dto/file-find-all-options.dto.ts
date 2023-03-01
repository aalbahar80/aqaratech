import { ApiProperty } from '@nestjs/swagger';

import {
	FileFindAllOptionsSchema,
	FileFindOneOptionsSchema,
	FileRelationKey,
	FileRelationKeyEnum,
} from '@self/utils';
import { Exactly } from 'src/types/exactly.type';

export class FileFindAllOptionsDto
	implements Exactly<FileFindAllOptionsSchema, FileFindAllOptionsDto>
{
	@ApiProperty({ enum: FileRelationKeyEnum, enumName: 'FileRelationKeyEnum' })
	relationKey: FileRelationKey;

	relationValue: string;
}

export class FileFindOneOptionsDto
	implements Exactly<FileFindOneOptionsSchema, FileFindOneOptionsDto>
{
	id: string;
}
