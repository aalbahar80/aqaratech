import { Field } from '$components/form/Field';

export const graphqlName = 'transactions';

export const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'amount',
		title: 'Amount',
		editable: false,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'created_at',
		title: 'Created At',
		editable: false,
		searchable: false,
	}),
	new Field({
		fieldName: 'due_date',
		title: 'due_date',
		editable: false,
		searchable: false,
	}),
	new Field({
		fieldName: 'is_paid',
		title: 'Paid?',
		inputType: 'checkbox',
		searchable: false,
	}),
	new Field({
		fieldName: 'lease_id',
		title: 'Lease',
		searchType: 'number',
		editable: false,
	}),
	new Field({
		fieldName: 'memo',
		title: 'Memo',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'receipt_url',
		title: 'Receipt',
		// TODO change
		inputType: 'text',
		editable: false,
	}),
];

export const validation = false;
