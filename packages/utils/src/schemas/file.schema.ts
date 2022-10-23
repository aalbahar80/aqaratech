import { z } from 'zod';
import { isID } from './utils/id.schema';
import { trim } from './utils/zod-transformers';

export const FileRelationKeyEnum = [
	'tenant',
	'portfolio',
	'property',
	'unit',
	'expense',
	'lease',
	'leaseInvoice',
	'maintenanceOrder',
] as const;

export const fileCreateSchema = z
	.object({
		organizationId: isID,
		fileName: z.string().min(1, { message: 'Required' }).transform(trim),

		relationKey: z.enum(FileRelationKeyEnum),
		relationValue: isID,
	})
	.strict();
