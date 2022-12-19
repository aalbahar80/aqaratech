import { EntityNames } from '@self/utils';

import { PortfolioSearchDocument } from 'src/portfolios/dto/portfolio-search-document';
import { PropertySearchDocument } from 'src/properties/dto/property-search-document';
import { TenantSearchDocument } from 'src/tenants/dto/tenant-search-document';

export class RemoveDocumentsEvent {
	constructor(
		public readonly ids: string[],
		public readonly indexName: TIndexName,
	) {}
}

export class UpdateIndexEvent<T extends TIndexName = TIndexName> {
	constructor(
		public readonly items: (Item<T> & {
			id: string;
			organizationId: string;
			// portfolioId: string; // enable if search is enabled for portfolio users
		})[],
		public readonly indexName: T,
		public readonly classConstructor: new () => ClassConstructor<T>,
	) {}
}

export type TIndexName = Extract<
	EntityNames['title'],
	'tenant' | 'portfolio' | 'property'
>;

type Item<T extends TIndexName> = T extends 'tenant'
	? Omit<TenantSearchDocument, 'title'>
	: T extends 'portfolio'
	? Omit<PortfolioSearchDocument, 'title'>
	: T extends 'property'
	? Omit<PropertySearchDocument, 'title' | 'address'>
	: never;

// create a generic type that returns the class constructor type based on the index name
type ClassConstructor<T extends TIndexName> = T extends 'tenant'
	? TenantSearchDocument
	: T extends 'portfolio'
	? PortfolioSearchDocument
	: T extends 'property'
	? PropertySearchDocument
	: never;
