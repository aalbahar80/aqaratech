import { ApiProperty } from '@nestjs/swagger';
import { FacetDistribution, Hits, SearchResponse } from 'meilisearch';
import { TIndexName } from 'src/events/update-index.event';

export class SearchDto implements SearchResponse {
	@ApiProperty({ type: String })
	entityTitle: TIndexName;
	@ApiProperty({
		type: 'array',
		items: {
			title: 'HitDto',
			type: 'object',
			required: ['id', 'entity', 'formatted'],
			properties: {
				id: { type: 'string' },
				title: { type: 'string', nullable: true },
				entity: { type: 'string' },
				formatted: {
					type: 'object',
					properties: { title: { type: 'string', nullable: true } },
				},
			},
		},
	})
	hits: Hits<HitAdditionalProps>;
	offset: number;
	limit: number;
	processingTimeMs: number;
	facetDistribution?: FacetDistribution | undefined;
	query: string;
	estimatedTotalHits: number;
}

export interface HitAdditionalProps {
	id: string;
	title?: string | null;
	entity: string;
}
