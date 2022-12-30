export const SearchableFields = {
	tenant: [
		'fullName',
		'label',
		'phone',
		'civilid',
		'passportNum',
		'residencyNum',
		'email',
	],
	portfolio: ['fullName', 'label', 'phone', 'civilid', 'email'],
	property: ['label', 'paci', 'area', 'street'],
} as const;

export const ALL_SEARCHABLE_FIELDS = [
	...SearchableFields.tenant,
	...SearchableFields.portfolio,
	...SearchableFields.property,
];
