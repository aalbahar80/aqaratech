export const dbEntity = [
	'organization',
	'role',
	'tenant',
	'portfolio',
	'property',
	'unit',
	'lease',
	'leaseInvoice',
	'expense',
	'payout',
	'maintenanceOrder',
] as const;

export const nonDbEntity = ['member', 'expenseCategory', 'file'] as const;

export type DBEntity = typeof dbEntity[number];
export type NonDBEntity = typeof nonDbEntity[number];
export type Entity = DBEntity | NonDBEntity;
