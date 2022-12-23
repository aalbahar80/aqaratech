import { ForbiddenError, subject } from '@casl/ability';
import {
	Inject,
	Injectable,
	LoggerService,
	OnModuleInit,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { Filter, Index, MeiliSearch } from 'meilisearch';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { entitiesMap } from '@self/utils';

import { Action } from 'src/casl/action.enum';
import { EnvService } from 'src/env/env.service';
import {
	RemoveDocumentsEvent,
	TIndexName,
	UpdateIndexEvent,
} from 'src/events/update-index.event';
import { IUser } from 'src/interfaces/user.interface';
import { PortfolioSearchDocument } from 'src/portfolios/dto/portfolio-search-document';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertySearchDocument } from 'src/properties/dto/property-search-document';
import { ExtractParams, InitIndexParams } from 'src/search/dto/search-index';
import { TenantSearchDocument } from 'src/tenants/dto/tenant-search-document';

@Injectable()
export class SearchService implements OnModuleInit {
	constructor(
		private readonly prisma: PrismaService,
		private readonly env: EnvService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {
		const host = this.env.e.MEILISEARCH_HOST;
		const apiKey = this.env.e.MEILISEARCH_API_KEY;

		if (!host || !apiKey) {
			this.logger.warn('Meilisearch host or api key not set. Search disabled');
		} else {
			this.client = new MeiliSearch({
				host,
				apiKey,
			});
		}
	}

	async onModuleInit() {
		// attempts to initialize every time nest starts
		// If this becomes an expensive operation in the future, we can implement an alternative (cron, hueristics, etc)
		try {
			await this.init();
		} catch (e) {
			this.logger.error('Error initializing search service', e);
		}
	}

	readonly client?: MeiliSearch;

	assertClientExists(): asserts this is this & { client: MeiliSearch } {
		if (!this.client) {
			throw new Error('Meilisearch client not initialized');
		}
	}

	indexNames: TIndexName[] = [
		entitiesMap.portfolio.title,
		entitiesMap.property.title,
		entitiesMap.tenant.title,
	];

	async search({
		query,
		organizationId,
		user,
	}: {
		query: string;
		organizationId: string;
		user: IUser;
	}) {
		this.assertClientExists();

		// search is only allowed for admins
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Manage,
			subject('Organization', { id: organizationId }),
		);

		if (!isUUID(organizationId)) {
			// might be overkill, but just in case
			throw new Error('Invalid organization id');
		}

		// get indexes and search
		const indexes = await Promise.all(
			this.indexNames.map((indexName) => {
				this.assertClientExists();

				return this.client.getIndex(indexName);
			}),
		);

		const results = await Promise.all(
			indexes.map(async (index, n) => {
				const indexName = this.indexNames[n];

				if (!indexName) {
					throw new Error('Invalid index name'); // should never happen
				}

				return {
					entityTitle: indexName,
					...(await this.searchIndex({
						index,
						indexName,
						filter: `organizationId = ${organizationId}`,
						query,
					})),
				};
			}),
		);

		return results;
	}

	async searchIndex({
		index,
		indexName,
		query,
		filter,
	}: {
		index: Index;
		indexName: TIndexName;
		query: string;
		filter?: Filter | undefined;
	}) {
		const data = await index.search<
			TenantSearchDocument | PortfolioSearchDocument | PropertySearchDocument
		>(query, {
			highlightPreTag: '<mark>',
			highlightPostTag: '</mark>',

			attributesToHighlight: ['*'],
			limit: 20,
			...(filter ? { filter } : {}),
		});

		const hitsWithEntity = data.hits.map((hit) => {
			const { _formatted, ...rest } = hit;
			return {
				...rest,
				entity: entitiesMap[indexName].title,

				// rename _formatted to formatted to avoid openapi sdk issues
				formatted: _formatted,
			};
		});

		return {
			...data,
			hits: hitsWithEntity,
		};
	}

	@OnEvent('update.index')
	async updateIndex(payload: UpdateIndexEvent) {
		this.assertClientExists();

		// const { indexName, items, classConstructor } = payload;
		const index = this.client.index(payload.indexName);

		const documents = payload.items.map((item) => {
			const instance = plainToInstance(payload.classConstructor, item);
			const plain = instanceToPlain(instance); // to expose custom getters
			return plain;
		});

		try {
			await index.addDocuments(documents, { primaryKey: 'id' });
		} catch (e) {
			this.logger.error(e);
		}
	}

	@OnEvent('remove.documents')
	async removeDocuments(payload: RemoveDocumentsEvent) {
		this.assertClientExists();

		const { indexName, ids } = payload;

		const index = this.client.index(indexName);

		try {
			await index.deleteDocuments(ids);
		} catch (e) {
			this.logger.error(e);
		}
	}

	async remove() {
		this.assertClientExists();

		const indexes = await this.client.getIndexes();
		return await Promise.all(
			indexes.results.map((index) => {
				this.assertClientExists();

				return this.client.deleteIndex(index.uid);
			}),
		);
	}

	/**
	 * common logic for all indices
	 */
	async initIndex<T extends InitIndexParams['indexName']>(
		...arg: ExtractParams<T>
	) {
		this.assertClientExists();

		await this.client.index(arg[0]).updateSettings({
			filterableAttributes: ['organizationId'], // required for authz
			// @ts-expect-error until better type inference is available
			// https://twitter.com/AndaristRake/status/1509880643668389888
			searchableAttributes: arg[1], // order sets relevance score
			typoTolerance: {
				minWordSizeForTypos: {
					// https://docs.meilisearch.com/learn/configuration/typo_tolerance.html#configuring-typo-tolerance
					oneTypo: 3, // default: 5
					twoTypos: 6, // default: 9
				},
			},
		});
	}

	async init() {
		await this.initIndex(entitiesMap.tenant.title, [
			'title',
			'fullName',
			'label',
			'phone',
			'civilid',
			'passportNum',
			'residencyNum',
		]);

		await this.initIndex(entitiesMap.portfolio.title, [
			'title',
			'fullName',
			'label',
			'phone',
			'civilid',
		]);

		await this.initIndex(entitiesMap.property.title, [
			'address',
			'label',
			'paci',
			'area',
			'street',
			'portfolioId',
		]);

		// add all documents to their respective indices
		return await Promise.all([
			this.initTenantDocuments(),
			this.initPortfolioDocuments(),
			this.initPropertyDocuments(),
		]);
	}

	async initTenantDocuments() {
		const tenants = await this.prisma.tenant.findMany({
			select: {
				id: true,
				fullName: true,
				label: true,
				phone: true,
				passportNum: true,
				civilid: true,
				residencyNum: true,
				organizationId: true,
			},
		});

		await this.updateIndex({
			indexName: entitiesMap.tenant.title,
			items: tenants,
			classConstructor: TenantSearchDocument,
		});
	}

	async initPortfolioDocuments() {
		const portfolios = await this.prisma.portfolio.findMany({
			select: {
				id: true,
				fullName: true,
				label: true,
				phone: true,
				civilid: true,
				organizationId: true,
			},
		});

		await this.updateIndex({
			indexName: entitiesMap.portfolio.title,
			items: portfolios,
			classConstructor: PortfolioSearchDocument,
		});
	}

	async initPropertyDocuments() {
		// TODO only fetch relevant fields
		const properties = await this.prisma.property.findMany({
			select: {
				id: true,
				label: true,
				area: true,
				paci: true,
				street: true,
				parcel: true,
				block: true,
				number: true,
				portfolioId: true,
				organizationId: true,
			},
		});

		await this.updateIndex({
			indexName: entitiesMap.property.title,
			items: properties,
			classConstructor: PropertySearchDocument,
		});
	}
}
