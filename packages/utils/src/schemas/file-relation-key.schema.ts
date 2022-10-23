import { z } from 'zod';

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

export const fileRelationKeySchema = z.enum(FileRelationKeyEnum);

export type FileRelationKey = z.infer<typeof fileRelationKeySchema>;
