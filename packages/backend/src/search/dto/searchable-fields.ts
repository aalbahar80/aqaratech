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

/** Fields that should be returned with search results, *and* highlighted by minisearch */
export const ALL_SEARCHABLE_FIELDS = [
	...SearchableFields.tenant,
	...SearchableFields.portfolio,
	...SearchableFields.property,
];

/** Fields that should be returned with search results, but *not* highlighted by minisearch */
export const NON_SEARCHABLE_FIELDS = ['portfolioId', 'organizationId'];
