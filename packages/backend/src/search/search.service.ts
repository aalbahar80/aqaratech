import { Injectable } from '@nestjs/common';
import { Index, MeiliSearch } from 'meilisearch';
import { PrismaService } from 'src/prisma/prisma.service';

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
    // return index.search(query);
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
