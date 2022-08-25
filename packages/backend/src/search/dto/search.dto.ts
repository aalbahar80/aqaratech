import { ApiProperty } from '@nestjs/swagger';
import { FacetDistribution, Hits, SearchResponse } from 'meilisearch';
import { TIndexName } from 'src/events/update-index.event';

class Hit {
  id: string;
  title: string;
  _formatted: FormattedHit;
}

class FormattedHit {
  title: string;
}

export class SearchDto implements SearchResponse {
  entityTitle: TIndexName;
  @ApiProperty({ type: Hit, isArray: true })
  hits: Hits<Record<string, any>>;
  offset: number;
  limit: number;
  processingTimeMs: number;
  facetDistribution?: FacetDistribution | undefined;
  query: string;
  estimatedTotalHits: number;
}
