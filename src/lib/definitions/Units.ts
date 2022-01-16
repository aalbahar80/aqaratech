import { Field } from '$components/form/Field';

export const graphqlName = 'units';

export const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'is_vacant',
		title: 'Vacant?',
		editable: false,
		searchable: false,
	}),
	new Field({
		fieldName: 'rent_market',
		title: 'Market Rent',
		inputType: 'number',
		searchType: 'number',
	}),
	new Field({
		fieldName: 'size',
		title: 'Size m²',
		inputType: 'number',
		searchType: 'number',
	}),
	new Field({
		fieldName: 'type',
		title: 'Type',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'unit_number',
		title: 'Number',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'usage',
		title: 'Usage',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'bed',
		title: 'Beds',
		inputType: 'number',
		searchable: false,
	}),
	new Field({
		fieldName: 'bath',
		title: 'Baths',
		inputType: 'number',
		searchable: false,
	}),
	new Field({
		fieldName: 'floor',
		title: 'Floor',
		searchable: false,
	}),
];

export const validation = false;
