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

  getMovieIndex(): Index {
    return this._client.index('movies');
  }

  async addDocuments(documents: any) {
    const index = this.getMovieIndex();
    return index.addDocuments(documents);
  }

  async search(query: string) {
    const index = this.getMovieIndex();
    const data = await index.search(query, {
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
      attributesToHighlight: ['title'],
      limit: 5,
    });

    data.hits = data.hits.map((hit) => ({
      ...hit,
      url: `/leases/${hit.id}`,
    }));

    return data;
  }

  remove() {
    return this.getMovieIndex().deleteAllDocuments();
  }

  async init() {
    await this._client.createIndex('movies');
    await this.getMovieIndex().addDocuments([{ title: 'Star Wars' }]);
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

    return this.addDocuments(documents);
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

    return this.addDocuments(documents);
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

    return this.addDocuments(documents);
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

    return this.addDocuments(documents);
  }
}
