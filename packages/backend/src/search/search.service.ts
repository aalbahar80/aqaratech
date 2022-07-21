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
    const indexNames = [
      'portfolios',
      'properties',
      'tenants',
      'leases',
    ] as const;

    // get indexes and search
    const indexes = await Promise.all(
      indexNames.map((indexName) => {
        return this._client.getIndex(indexName);
      }),
    );

    const results = await Promise.all(
      indexes.map((index, n) => {
        return this.searchIndex({
          index,
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
      leases: results[3],
    };

    return result;
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
      indexes.results.map((index) => {
        return this._client.deleteIndex(index.uid);
      }),
    );
  }

  async init() {
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
        // TODO add search by role.email
        id: true,
        fullName: true,
        label: true,
        phone: true,
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
        // TODO add search by role.email
        id: true,
        fullName: true,
        label: true,
        phone: true,
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
