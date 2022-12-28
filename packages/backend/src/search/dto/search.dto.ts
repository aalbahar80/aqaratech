export class HitDto {
	id: string;
	title: string;
	entityType: string;
	score: number;
	hints: Record<string, string>;
}

export class SearchDto {
	tenants: HitDto[];
	portfolios: HitDto[];
	properties: HitDto[];
}
