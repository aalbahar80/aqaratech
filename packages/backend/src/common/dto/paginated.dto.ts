import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

interface IPageMetaDtoParameters {
	page: number;
	take: number;
	itemCount: number;
	pageSize: number;
}

export class PaginatedDto {
	@ApiProperty()
	readonly page: number;

	@ApiProperty()
	readonly take: number;

	@ApiProperty({ description: 'Total number of items in the collection' })
	readonly itemCount: number;

	@ApiProperty()
	readonly pageCount: number;

	@ApiProperty()
	readonly hasPreviousPage: boolean;

	@ApiProperty()
	readonly hasNextPage: boolean;

	@ApiProperty()
	readonly pageSize: number;

	@ApiProperty()
	readonly start: number;

	@ApiProperty()
	readonly end: number;

	// TODO fix pagination meta when no results
	// handle when requesting page 5 but there are only 2 pages
	constructor({ page, take, itemCount, pageSize }: IPageMetaDtoParameters) {
		const offset = (page - 1) * take;
		this.page = page;
		this.take = take;
		this.itemCount = itemCount;
		this.pageCount = Math.ceil(this.itemCount / this.take);
		this.hasPreviousPage = this.page > 1;
		this.hasNextPage = this.page < this.pageCount;
		this.pageSize = pageSize;
		this.start = offset + 1;
		this.end = offset + this.pageSize;
	}
}

export class PaginatedMetaDto<TData> {
	@ApiProperty()
	readonly pagination: PaginatedDto;

	@ApiHideProperty()
	readonly results: TData[];
}

/**
 * To be consumed by the pagination interceptor.
 */
export interface WithCount<T> {
	total: number;
	results: T[];
}
