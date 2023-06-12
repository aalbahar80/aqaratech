import type {
	EntityFieldLabels,
	ExpenseCategoryCreateSchema,
	ExpenseCategoryUpdateSchema,
	ExpenseCreateSchema,
	ExpenseUpdateSchema,
	FileCreateSchema,
	LeaseCreateSchema,
	LeaseInvoiceCreateSchema,
	LeaseInvoiceUpdateSchema,
	LeaseUpdateSchema,
	MaintenanceOrderCreateSchema,
	MaintenanceOrderUpdateSchema,
	OrganizationSchema,
	PayoutCreateSchema,
	PortfolioCreateSchema,
	PortfolioUpdateSchema,
	PropertyCreateSchema,
	PropertyUpdateSchema,
	RoleCreateSchema,
	TenantCreateSchema,
	TenantUpdateSchema,
	UnitCreateSchema,
	UnitUpdateSchema,
	UserCreateSchema,
	UserUpdateSchema,
} from '@self/utils';
import type { OrganizationSettingsSchema } from '@self/utils/src/schemas';

import type { MessageDto } from '$api/openapi';
import type {
	DAYS_KEY,
	MONTHS_KEY,
} from '$lib/components/form/model/organization';

type Schemas = OrganizationSettingsSchema &
	UserCreateSchema &
	UserUpdateSchema &
	RoleCreateSchema &
	OrganizationSchema &
	TenantCreateSchema &
	TenantUpdateSchema &
	PortfolioCreateSchema &
	PortfolioUpdateSchema &
	PropertyCreateSchema &
	PropertyUpdateSchema &
	UnitCreateSchema &
	UnitUpdateSchema &
	LeaseCreateSchema &
	LeaseUpdateSchema &
	LeaseInvoiceCreateSchema &
	LeaseInvoiceUpdateSchema &
	ExpenseCreateSchema &
	ExpenseUpdateSchema &
	ExpenseCategoryCreateSchema &
	ExpenseCategoryUpdateSchema &
	MaintenanceOrderCreateSchema &
	MaintenanceOrderUpdateSchema &
	PayoutCreateSchema &
	FileCreateSchema &
	MessageDto;

type Keys = keyof Schemas;

export const fields = {
	// common
	id: 'ID',
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
	postAt: 'Due date',

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
	isPaid: 'Payment Status',
	dueAt: 'Past due date',
	dueDuration: 'Due Duration',
	dueDurationMonths: 'Due duration (months)',
	dueDurationDays: 'Due duration (days)',
	paidAt: 'Payment date',
	mfPaymentId: 'MyFatoorah Payment ID',

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

	// message
	date: 'Date',
	recipients: 'Recipients',
} as const satisfies Fields;

/** Fields that are not needed */
type OmittedFields =
	| 'portfolioId'
	| 'propertyId'
	| 'unitId'
	| 'leaseId'
	| 'settings'
	| 'parentId'
	| 'file'
	| 'relationKey'
	| 'relationValue';

type Fields = Record<Exclude<Keys, OmittedFields>, string> & {
	createdAt: string;
	updatedAt: string;
	key: string; // FileDto
	size2: string; // FileDto
	dueAt: string; // computed
	[MONTHS_KEY]: string;
	[DAYS_KEY]: string;
	mfPaymentId: string; // LeaseInvoiceDto (not in schema)
} & IdenticalIfExists<EntityFieldLabels>;

/** Ensure that fields declared twice have the same value */
type IdenticalIfExists<T> = {
	[K in keyof Partial<T>]: T[K] extends T[K] ? Partial<T[K]> : never;
};
