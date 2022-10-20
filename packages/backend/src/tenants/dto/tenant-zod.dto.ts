import { tenantSchema } from 'src/tenants/dto/tenant.schema';
import { z } from 'zod';

// change z.input after creating validation pipe
// Doesn't error if we add extra fields, is there a version of implement that does?
export class CreateTenantZodDto implements z.infer<typeof tenantSchema> {
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
