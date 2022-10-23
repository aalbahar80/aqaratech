import { IsString } from 'class-validator';

// TODO: better types
export class FileFindAllOptionsDto {
	@IsString()
	relationKey: string;

	@IsString()
	relationValue: string;
}

export class FileFindOneOptionsDto {
	@IsString()
	key: string;
}
