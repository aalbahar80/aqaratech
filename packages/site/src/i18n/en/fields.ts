import type {
	UserCreateSchema,
	UserUpdateSchema,
	RoleCreateSchema,
	OrganizationSchema,
	TenantCreateSchema,
	TenantUpdateSchema,
	PortfolioCreateSchema,
	PortfolioUpdateSchema,
	PropertyCreateSchema,
	PropertyUpdateSchema,
	UnitCreateSchema,
	UnitUpdateSchema,
	LeaseCreateSchema,
	LeaseUpdateSchema,
	LeaseInvoiceCreateSchema,
	LeaseInvoiceUpdateSchema,
	ExpenseCreateSchema,
	ExpenseUpdateSchema,
	ExpenseCategoryCreateSchema,
	ExpenseCategoryUpdateSchema,
	MaintenanceOrderCreateSchema,
	MaintenanceOrderUpdateSchema,
	PayoutCreateSchema,
	FileCreateSchema,
} from '@self/utils';

import type { Union } from 'ts-toolbelt';

type Schemas =
	| UserCreateSchema
	| UserUpdateSchema
	| RoleCreateSchema
	| OrganizationSchema
	| TenantCreateSchema
	| TenantUpdateSchema
	| PortfolioCreateSchema
	| PortfolioUpdateSchema
	| PropertyCreateSchema
	| PropertyUpdateSchema
	| UnitCreateSchema
	| UnitUpdateSchema
	| LeaseCreateSchema
	| LeaseUpdateSchema
	| LeaseInvoiceCreateSchema
	| LeaseInvoiceUpdateSchema
	| ExpenseCreateSchema
	| ExpenseUpdateSchema
	| ExpenseCategoryCreateSchema
	| ExpenseCategoryUpdateSchema
	| MaintenanceOrderCreateSchema
	| MaintenanceOrderUpdateSchema
	| PayoutCreateSchema
	| FileCreateSchema;

// type Keys = KeysOfUnion<Schemas>;
type Keys = keyof Union.IntersectOf<Schemas>;

export const fields = {
	// common
	fullName: 'Full Name',
	label: 'Label',
	dob: 'Date of Birth',
	civilid: 'Civil ID',
	phone: 'Phone Number',
	email: 'Email Address',
	memo: 'Memo',
	amount: 'Amount',

	createdAt: 'Created At',
	updatedAt: 'Updated At',
	postAt: 'Post At',

	// tenant
	passportNum: 'Passport Number',
	residencyNum: 'Residency Number',
	residencyEnd: 'Residency Expiration',
	nationality: 'Nationality',

	// property
	block: 'Block',
	street: 'Street',
	avenue: 'Avenue',
	number: 'Number',
	paci: 'Paci',
	parcel: 'Parcel',
	size: 'Size',
	// cost: 'Cost',

	// unit
	type: 'Type',
	unitNumber: 'Unit Number',
	floor: 'Floor',
	bed: 'Bed',
	bath: 'Bath',
	area: 'Area',
	usage: 'Usage',
	marketRent: 'Market Rent',

	// lease
	monthlyRent: 'Monthly Rent',
	deposit: 'Deposit',
	start: 'Start',
	end: 'End',
	notify: 'Send payment reminders',
	canPay: 'Allow tenant to pay invoices online',
	tenantId: 'Tenant',
	license: 'License',

	// invoice
	isPaid: 'Is Paid',
	dueAt: 'Due At',
	paidAt: 'Paid At',

	// expense
	categoryId: 'Category',

	// maintenance
	title: 'Title',
	description: 'Description',
	status: 'Status',
	completedAt: 'Completed At',

	// expense category
	labelEn: 'Label (English)',
	labelAr: 'Label (Arabic)',
	isGroup: 'Is Group',

	// file
	key: 'Name',
	fileName: 'File Name',
	size2: 'Size',
} satisfies Fields;

type Fields = Record<Keys, string> & {
	createdAt: string;
	updatedAt: string;
	key: string; // FileDto
};
