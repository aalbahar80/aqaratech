import { Injectable } from '@nestjs/common';
import { Index, MeiliSearch } from 'meilisearch';
import { PrismaService } from 'src/prisma/prisma.service';
import { getAddress } from 'src/utils/address';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {
    this._client = new MeiliSearch({
      host: 'http://localhost:7700',
      apiKey: 'MASTER_KEY',
    });
  }

  private _client: MeiliSearch;

  async search(query: string) {
    const indexNames = ['tenants', 'portfolios', 'properties', 'leases'];
    // get indexes and search
    const indexes = await Promise.all(
      indexNames.map((indexName) => {
        return this._client.getIndex(indexName);
      }),
    );

    const results = await Promise.all(
      indexes.map((index) => {
        // return index.search(query);
        return this.searchIndex({
          index,
          query,
          createUrl(id) {
            return `/api/tenants/${id}`;
          },
        });
      }),
    );
    console.log({ results }, 'search.service.ts ~ 38');
    return results;
  }

  async searchIndex({
    index,
    query,
    createUrl,
  }: {
    index: Index;
    query: string;
    createUrl: (id: string) => string;
  }) {
    const data = await index.search(query, {
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
      attributesToHighlight: ['title'],
      limit: 20,
    });

    data.hits = data.hits.map((hit) => ({
      ...hit,
      url: createUrl(hit.id),
    }));

    return data;
  }

  async remove() {
    const indexes = await this._client.getIndexes();
    return await Promise.all(
      indexes.map((index) => {
        return this._client.deleteIndex(index.uid);
      }),
    );
  }

  async init() {
    await this._client.createIndex('movies');
    return await Promise.all([
      this.addTenants(),
      this.addPortfolios(),
      this.addProperties(),
      this.addLeases(),
    ]);
  }

  async addTenants() {
    const tenants = await this.prisma.tenant.findMany({
      select: {
        id: true,
        fullName: true,
        shortName: true,
        phone: true,
        email: true,
        passportNum: true,
        civilid: true,
        residencyNum: true,
      },
    });

    const documents = tenants.map((tenant) => {
      return {
        ...tenant,
        title: tenant.fullName,
      };
    });

    const index = this._client.index('tenants');
    return index.addDocuments(documents);
  }

  async addPortfolios() {
    const portfolios = await this.prisma.portfolio.findMany({
      select: {
        id: true,
        fullName: true,
        shortName: true,
        phone: true,
        email: true,
        civilid: true,
      },
    });

    const documents = portfolios.map((portfolio) => {
      return {
        ...portfolio,
        title: portfolio.fullName,
      };
    });

    const index = this._client.index('portfolios');
    return index.addDocuments(documents);
  }

  async addProperties() {
    // TODO only fetch relevant fields
    const properties = await this.prisma.property.findMany();

    const documents = properties.map((property) => {
      const { id } = property;
      return {
        id,
        title: getAddress(property),
        area: property.area,
        paci: property.paci,
        parcel: property.parcel,
        street: property.street,
      };
    });

    const index = this._client.index('properties');
    return index.addDocuments(documents);
  }

  async addLeases() {
    const leases = await this.prisma.lease.findMany({
      include: {
        tenant: true,
        unit: true,
        leaseInvoices: true,
      },
    });

    const documents = leases.map((lease) => {
      const { id, tenant, leaseInvoices } = lease;
      return {
        id,
        title: tenant.fullName,
        unitType: lease.unit.type,
        unitNumber: lease.unit.unitNumber,
      };
    });

    const index = this._client.index('leases');
    return index.addDocuments(documents);
  }
}
