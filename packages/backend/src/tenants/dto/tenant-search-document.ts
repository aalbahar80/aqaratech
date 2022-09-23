import { Tenant } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TenantSearchDocument implements Partial<Tenant> {
	id: string;
	fullName: string;
	label: string | null;
	phone: string | null;
	passportNum: string | null;
	civilid: string | null;
	residencyNum: string | null;
	organizationId: string;

	@Expose()
	get title(): string {
		return this.fullName;
	}
}
