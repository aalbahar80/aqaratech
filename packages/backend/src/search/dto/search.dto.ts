import { ApiProperty } from '@nestjs/swagger';
import { FacetDistribution, Hits, SearchResponse } from 'meilisearch';
import { TIndexName } from 'src/events/update-index.event';

export class SearchDto implements SearchResponse {
  @ApiProperty({ type: String })
  entityTitle: TIndexName;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { id: { type: 'string' }, _formatted: { type: 'object' } },
    },
  })
  hits: Hits<Record<string, any>>;
  offset: number;
  limit: number;
  processingTimeMs: number;
  facetDistribution?: FacetDistribution | undefined;
  query: string;
  estimatedTotalHits: number;
}
