import { Portfolio } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PortfolioSearchDocument implements Partial<Portfolio> {
	id: string;
	fullName: string;
	label: string | null;
	phone: string | null;
	civilid: string | null;
	organizationId: string;

	@Expose()
	get title(): string {
		return this.fullName;
	}
}
