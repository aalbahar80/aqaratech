import { fileCreateSchema } from '@self/utils';
import { IsString } from 'class-validator';
import { z } from 'zod';

// TODO: better types
export class FileFindAllOptionsDto {
	@IsString()
	relationKey: z.infer<typeof fileCreateSchema>['relationKey'];

	@IsString()
	relationValue: string;
}

export class FileFindOneOptionsDto {
	@IsString()
	key: string;
}
