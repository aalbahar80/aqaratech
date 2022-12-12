import { entitiesMap } from '@self/utils';

import { PortfolioSearchDocument } from 'src/portfolios/dto/portfolio-search-document';
import { PropertySearchDocument } from 'src/properties/dto/property-search-document';
import { TenantSearchDocument } from 'src/tenants/dto/tenant-search-document';

export type InitIndexParams =
	| {
			indexName: typeof entitiesMap['tenant']['title'];
			searchableAttributes: (keyof TenantSearchDocument)[];
	  }
	| {
			indexName: typeof entitiesMap['portfolio']['title'];
			searchableAttributes: (keyof PortfolioSearchDocument)[];
	  }
	| {
			indexName: typeof entitiesMap['property']['title'];
			searchableAttributes: (keyof PropertySearchDocument)[];
	  };

export type ExtractParams<T> = Extract<
	InitIndexParams,
	{ indexName: T }
> extends {
	searchableAttributes: infer P;
}
	? [indexName: T, searchableAttributes: P]
	: [indexName: T];
