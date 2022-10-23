import { FileRelationKey } from '@self/utils';
import { IsString } from 'class-validator';

// TODO: better types
export class FileFindAllOptionsDto {
	@IsString()
	relationKey: FileRelationKey;

	@IsString()
	relationValue: string;
}

export class FileFindOneOptionsDto {
	@IsString()
	key: string;
}
