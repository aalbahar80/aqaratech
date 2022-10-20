import { tenantSchema } from 'src/tenants/dto/tenant.schema';
import { z } from 'zod';

// change z.input after creating validation pipe
export class CreateTenantZodDtoOutput implements z.infer<typeof tenantSchema> {
	organizationId: string; // TODO: remove
	fullName: string;
	label?: string | null | undefined;
	civilid?: string | null | undefined;
	phone?: string | null | undefined;
	dob?: string | null | undefined;
	nationality?: string | null | undefined;
	passportNum?: string | null | undefined;
	residencyEnd?: string | null | undefined;
	residencyNum?: string | null | undefined;
}
