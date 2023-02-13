import {
	ParsedQueryModel,
	ParsedQuerySortModel,
} from '@prisma-utils/nestjs-request-parser';

import { PaidLate } from '@self/utils';

/**
 * Query options after parsing.
 */
export class QueryOptionsDto implements Omit<ParsedQueryModel, 'filter'> {
	page: number;
	skip: number;
	take: number;
	sort: ParsedQuerySortModel[];
	filter: object;
	filterCustom: {
		isPaidLate: PaidLate | undefined;
		[key: string]: unknown;
	};
}

/**
 * The input for the query options. Used for swagger.
 *
 * Schema: https://github.com/prisma-utils/prisma-utils/tree/main/libs/request-parser#query-parameter-schema
 */
export class QueryOptionsRequestDto
	implements Partial<Omit<ParsedQueryModel, 'filter' | 'sort'>>
{
	page?: number;
	skip?: number;
	take?: number;
	sort?: string[];
	filter?: object;
	/** For arbitrary filters that are not part of the schema.
	 * Ex. `filterCustom: { isPaidLate: true }` */
	filterCustom?: object;
}
