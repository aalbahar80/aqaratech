import { ForbiddenError, subject } from '@casl/ability';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { entitiesMap } from '@self/utils';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Filter, Index, MeiliSearch } from 'meilisearch';
import { Action } from 'src/casl/casl-ability.factory';
import { TIndexName, UpdateIndexEvent } from 'src/events/update-index.event';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { IUser } from 'src/interfaces/user.interface';
import { PortfolioSearchDocument } from 'src/portfolios/dto/portfolio-search-document';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertySearchDocument } from 'src/properties/dto/property-search-document';
import { TenantSearchDocument } from 'src/tenants/dto/tenant-search-document';

@Injectable()
export class SearchService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    readonly configService: ConfigService<EnvironmentConfig>,
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

  private readonly logger = new Logger(SearchService.name);

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
    entitiesMap.tenant.title,
    entitiesMap.portfolio.title,
    entitiesMap.property.title,
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

    // get indexes and search
    const indexes = await Promise.all(
      this.indexNames.map((indexName) => {
        return this.client.getIndex(indexName);
      }),
    );

    const results = await Promise.all(
      indexes.map((index, n) => {
        const indexName = this.indexNames[n];
        return this.searchIndex({
          index,
          indexName,
          filter: `organizationId = ${organizationId}`,
          query,
        });
      }),
    );

    const result: Record<typeof this.indexNames[number], any> = {
      tenant: results[0],
      portfolio: results[1],
      property: results[2],
    };

    return result;
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
    const data = await index.search(query, {
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
      attributesToHighlight: ['title'],
      limit: 20,
      filter,
    });

    data.hits = data.hits.map((hit) => ({
      ...hit,
      url: `/${entitiesMap[indexName].urlName}/${hit.id}`,
    }));

    return data;
  }

  @OnEvent('update.index')
  updateIndex(payload: UpdateIndexEvent) {
    const { indexName, items, classConstructor } = payload;
    const index = this.client.index(indexName);

    const documents = items.map((item) => {
      const instance = plainToClass(classConstructor, item);
      const plain = instanceToPlain(instance); // to expose custom getters
      return plain;
    });

    return index.addDocuments(documents);
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
  async initIndex(indexName: string) {
    const index = this.client.index(indexName);
    await index.updateSettings({ filterableAttributes: ['organizationId'] });
  }

  async init() {
    // create indexes, set common settings
    await Promise.all(
      this.indexNames.map((indexName) => this.initIndex(indexName)),
    );

    // add all documents to their respective indices
    return await Promise.all([
      this.initTenants(),
      this.initPortfolios(),
      this.initProperties(),
    ]);
  }

  async initTenants() {
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

  async initPortfolios() {
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

  async initProperties() {
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
