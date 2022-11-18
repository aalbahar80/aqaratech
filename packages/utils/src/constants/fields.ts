export const property = {
	required: ['area', 'block', 'number', 'street'],

	all: [
		'area',
		'block',
		'number',
		'street',
		'label',
		'avenue',
		'parcel',
		'paci',
	],
} as const;

export const unit = {
	required: ['unitNumber'],

	all: [
		'unitNumber',
		'bed',
		'bath',
		'size',
		'marketRent',
		'floor',
		'label',
		'type',
		'usage',
	],
} as const;

export const lease = {
	required: ['start', 'end', 'monthlyRent', 'deposit'],

	all: [
		'start',
		'end',
		'monthlyRent',
		'deposit',
		'notify',
		'canPay',
		'license',
		'tenantId',
	],
} as const;

export const leaseInvoice = {
	required: ['amount', 'postAt'],

	all: ['amount', 'isPaid', 'postAt', 'dueAt', 'paidAt', 'memo'],
} as const;

export const expense = {
	required: ['postAt', 'amount'],
	all: ['postAt', 'amount', 'categoryId', 'memo'],
} as const;

export const payout = {
	required: ['amount', 'postAt'],
	all: ['amount', 'postAt', 'memo'],
} as const;

export const expenseCategory = {
	required: ['labelEn', 'isGroup'],
	all: ['labelEn', 'labelAr', 'isGroup'],
} as const;

/**
 * The form fields for each entity.
 */
export const FIELDS = {
	property,
	unit,
	lease,
	leaseInvoice,
	expense,
	payout,
	expenseCategory,
} as const;
