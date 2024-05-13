import type { SearchInput } from './search-input.type';

export const inputs: SearchInput[] = [
	{
		queryExact: 'Alex Anderson',
		queryPrefix: 'Anders',
		querySuffix: 'lex',
		resultText: 'Alex Anderson',
		keysToValidate: [['fullName', 'Alex Anderson']],
		type: 'portfolio',
	},
	{
		queryExact: 'Bob Brown',
		queryPrefix: 'Brow',
		querySuffix: 'ob',
		resultText: 'Bob Brown',
		keysToValidate: [['fullName', 'Bob Brown']],
		type: 'tenant',
	},
	{
		queryExact: 'The Main St',
		queryPrefix: 'Ma',
		querySuffix: 'in',
		resultText: 'The Main St',
		keysToValidate: [['street', 'The Main St']],
		type: 'property',
	},
];
