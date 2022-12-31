export const SearchableFields = {
	tenant: [
		'fullName',
		'label',
		'phone',
		'civilid',
		'passportNum',
		'residencyNum',
		'email',
	] as const,
	portfolio: ['fullName', 'label', 'phone', 'civilid', 'email'] as const,
	property: ['label', 'paci', 'area', 'street', 'block', 'number'] as const,
};

/** Fields that should be returned with search results, highlighted, and ranked by minisearch */
export const ALL_SEARCHABLE_FIELDS = [
	...SearchableFields.tenant,
	...SearchableFields.portfolio,
	...SearchableFields.property,
] as const;

/** Fields that should be returned with search results, but *not* highlighted or ranked by minisearch */
const NON_SEARCHABLE_FIELDS = ['portfolioId', 'organizationId'] as const;

/** Fields that should be returned with search results */
export const ALL_RETURNED_FIELDS = [
	'id',
	...ALL_SEARCHABLE_FIELDS,
	...NON_SEARCHABLE_FIELDS,
] as const;
