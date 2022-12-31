import { ApiProperty } from '@nestjs/swagger';

import { DBEntity } from '@self/utils';

import { Exactly } from 'src/types/exactly.type';

type SearchableEntity = Extract<DBEntity, 'tenant' | 'portfolio' | 'property'>;
const SearchableEntityEnum = ['tenant', 'portfolio', 'property'] as const;

export class HitDto {
	id: string;
	title: string;
	@ApiProperty({ enum: SearchableEntityEnum, enumName: 'SearchableEntityEnum' })
	entity: SearchableEntity;
	score: number;
	hints: Record<string, string>;
}

export class SearchDto
	implements Exactly<Record<SearchableEntity, HitDto[]>, SearchDto>
{
	tenant: HitDto[];
	portfolio: HitDto[];
	property: HitDto[];
}
