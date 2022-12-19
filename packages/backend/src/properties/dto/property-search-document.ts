import { Property } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PropertySearchDocument implements Partial<Property> {
	id: string;
	organizationId: string;
	portfolioId: string;
	label: string | null;
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
	paci: string | null;

	@Expose()
	get address(): string {
		return [this.area, 'ق', this.block, 'م', this.number]
			.filter(Boolean)
			.join(' ');
	}

	@Expose()
	get title(): string {
		return this.address;
	}
}
