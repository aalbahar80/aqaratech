import { tenantSchema } from '@self/utils';
import { z } from 'zod';

// change z.input after creating validation pipe
// Doesn't error if we add extra fields, is there a version of implement that does?
export class CreateTenantZodDto implements z.infer<typeof tenantSchema> {
	fullName: string;
	label?: string | null;
	civilid?: string | null;
	phone?: string | null;
	dob?: string | null;
	nationality?: string | null;
	passportNum?: string | null;
	residencyEnd?: string | null;
	residencyNum?: string | null;
}
