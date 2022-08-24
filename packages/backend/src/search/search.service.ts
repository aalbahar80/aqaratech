import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Filter, Index, MeiliSearch } from 'meilisearch';
import { Action } from 'src/casl/casl-ability.factory';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { getAddress } from 'src/utils/address';

@Injectable()
export class SearchService {
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

  private client: MeiliSearch;

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

    const indexNames = ['portfolios', 'properties', 'tenants'] as const;

    // get indexes and search
    const indexes = await Promise.all(
      indexNames.map((indexName) => {
        return this.client.getIndex(indexName);
      }),
    );

    const results = await Promise.all(
      indexes.map((index, n) => {
        return this.searchIndex({
          index,
          filter: `organizationId = ${organizationId}`,
          query,
          createUrl(id) {
            return `/${indexNames[n]}/${id}`;
          },
        });
      }),
    );

    const result: Record<typeof indexNames[number], any> = {
      portfolios: results[0],
      properties: results[1],
      tenants: results[2],
    };

    return result;
  }

  async searchIndex({
    index,
    query,
    createUrl,
    filter,
  }: {
    index: Index;
    query: string;
    createUrl: (id: string) => string;
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
      url: createUrl(hit.id),
    }));

    return data;
  }

  async remove() {
    const indexes = await this.client.getIndexes();
    return await Promise.all(
      indexes.results.map((index) => {
        return this.client.deleteIndex(index.uid);
      }),
    );
  }

  async init() {
    return await Promise.all([
      this.addTenants(),
      this.addPortfolios(),
      this.addProperties(),
    ]);
  }

  async addTenants() {
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
        roles: { select: { user: { select: { email: true } } } },
      },
    });

    const documents = tenants.map((tenant) => {
      return {
        id: tenant.id,
        fullName: tenant.fullName,
        label: tenant.label,
        phone: tenant.phone,
        passportNum: tenant.passportNum,
        civilid: tenant.civilid,
        residencyNum: tenant.residencyNum,
        title: tenant.fullName,
        email: tenant.roles.map((role) => role.user.email),
        organizationId: tenant.organizationId,
      };
    });

    const index = this.client.index<typeof documents[0]>('tenants');
    await index.updateSettings({ filterableAttributes: ['organizationId'] });
    return index.addDocuments(documents, { primaryKey: 'id' });
  }

  async addPortfolios() {
    const portfolios = await this.prisma.portfolio.findMany({
      select: {
        id: true,
        fullName: true,
        label: true,
        phone: true,
        civilid: true,
        organizationId: true,
        roles: { select: { user: { select: { email: true } } } },
      },
    });

    const documents = portfolios.map((portfolio) => {
      return {
        id: portfolio.id,
        fullName: portfolio.fullName,
        label: portfolio.label,
        phone: portfolio.phone,
        civilid: portfolio.civilid,
        organizationId: portfolio.organizationId,
        title: portfolio.fullName,
        email: portfolio.roles.map((role) => role.user.email),
      };
    });

    const index = this.client.index('portfolios');
    await index.updateSettings({ filterableAttributes: ['organizationId'] });
    return index.addDocuments(documents, { primaryKey: 'id' });
  }

  async addProperties() {
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

    const documents = properties.map((property) => {
      const { id } = property;
      return {
        id,
        title: getAddress(property),
        label: property.label,
        area: property.area,
        paci: property.paci,
        parcel: property.parcel,
        street: property.street,
        organizationId: property.organizationId,
      };
    });

    const index = this.client.index('properties');
    await index.updateSettings({ filterableAttributes: ['organizationId'] });
    return index.addDocuments(documents, { primaryKey: 'id' });
  }
}
