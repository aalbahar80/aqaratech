import { ForbiddenError, subject } from '@casl/ability';
import {
	Inject,
	Injectable,
	Logger,
	LoggerService,
	OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { entitiesMap } from '@self/utils';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { isUUID } from 'class-validator';
import { Filter, Index, MeiliSearch } from 'meilisearch';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Action } from 'src/casl/action.enum';
import {
	RemoveDocumentsEvent,
	TIndexName,
	UpdateIndexEvent,
} from 'src/events/update-index.event';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
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
		readonly configService: ConfigService<EnvironmentConfig>,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {
		const host = configService.get('meiliSearchConfig.HOST', {
			infer: true,
		});
		const apiKey = configService.get('meiliSearchConfig.API_KEY', {
			infer: true,
		});
		if (!host || !apiKey) {
			throw new Error('MeiliSearch config is not set');
		}
		this.client = new MeiliSearch({ host, apiKey });
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

	readonly client: MeiliSearch;
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
				return this.client.getIndex(indexName);
			}),
		);

		const results = await Promise.all(
			indexes.map(async (index, n) => {
				const indexName = this.indexNames[n];
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
			filter,
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
		const { indexName, items, classConstructor } = payload;
		const index = this.client.index(indexName);

		const documents = items.map((item) => {
			const instance = plainToClass(classConstructor, item);
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
		const { indexName, ids } = payload;

		const index = this.client.index(indexName);

		try {
			await index.deleteDocuments(ids);
		} catch (e) {
			this.logger.error(e);
		}
	}

	async remove() {
		const indexes = await this.client.getIndexes();
		return await Promise.all(
			indexes.results.map((index) => {
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
