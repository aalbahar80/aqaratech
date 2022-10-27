import {
	ParsedQueryModel,
	ParsedQuerySortModel,
} from '@prisma-utils/nestjs-request-parser';

export class QueryOptionsDto implements ParsedQueryModel {
	page: number;
	skip: number;
	take: number;
	sort: ParsedQuerySortModel[];
	filter: object;
}
