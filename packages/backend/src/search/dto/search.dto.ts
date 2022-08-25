import { FacetDistribution, Hits, SearchResponse } from 'meilisearch';
import { TIndexName } from 'src/events/update-index.event';

export class SearchDto implements SearchResponse {
  entityTitle: TIndexName;
  hits: Hits<Record<string, any>>;
  offset: number;
  limit: number;
  processingTimeMs: number;
  facetDistribution?: FacetDistribution | undefined;
  query: string;
  estimatedTotalHits: number;
}
