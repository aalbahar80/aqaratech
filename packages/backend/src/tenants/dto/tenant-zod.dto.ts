import { tenantSchema } from 'src/tenants/dto/tenant.schema';
import { z } from 'zod';

// change z.input after creating validation pipe
export class CreateTenantZodDtoOutput implements z.infer<typeof tenantSchema> {
	organizationId: string; // TODO: remove
	fullName: string;
	label: string | null;
	civilid: string | null;
	phone: string | null;
	dob: string | null;
	nationality: string | null;
	passportNum: string | null;
	residencyEnd: string | null;
	residencyNum: string | null;
}
