import { Injectable } from '@nestjs/common';
import { Index, MeiliSearch } from 'meilisearch';

@Injectable()
export class SearchService {
  private _client: MeiliSearch;

  constructor() {
    this._client = new MeiliSearch({
      host: 'http://localhost:7700',
      apiKey: 'MASTER_KEY',
    });
  }

  getMovieIndex(): Index {
    return this._client.index('movies');
  }

  async addDocuments(documents: any) {
    const index = this.getMovieIndex();
    return index.addDocuments(documents);
  }

  async search(query: string): Promise<any> {
    const index = this.getMovieIndex();
    return index.search(query);
    // return index.search(query, {highlightPreTag: '<em>', highlightPostTag: '</em>'});
  }
}
