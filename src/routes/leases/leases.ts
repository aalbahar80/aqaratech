import { Field, FieldList } from '$components/form/Field';
import { page } from '$app/stores';
import {
	DeleteLeaseDocument,
	InsertLeaseDocument,
	LeaseListDocument,
	UpdateLeaseDocument
} from '$generated/graphql';
import * as yup from 'yup';
import {
	LeaseByIdDocument,
	LeaseByIdQuery,
	LeaseByIdQueryVariables
} from '$generated/graphql';
import { operationStore, query } from '@urql/svelte';

const title = 'Leases';
const graphQlName = 'leases';

const docs = {
	delete: DeleteLeaseDocument,
	list: LeaseListDocument,
	insert: InsertLeaseDocument,
	update: UpdateLeaseDocument,
	byId: LeaseByIdDocument
};

// refactor FieldList to array of Field objects
const fieldList = new FieldList([
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'start_date',
		title: 'Start',
		inputType: 'date',
		validation: yup.string().defined()
	}),
	new Field({
		fieldName: 'end_date',
		title: 'End',
		inputType: 'date',
		validation: yup.string().defined()
	}),
	new Field({
		fieldName: 'is_expired',
		title: 'Expired?',
		editable: false
	}),
	new Field({
		fieldName: 'is_signed',
		title: 'Signed?',
		editable: false
	}),
	new Field({
		fieldName: 'monthly_rent',
		title: 'Rent (KD)',
		inputType: 'number',
		validation: yup
			.number()
			.required()
			.positive()
			.typeError('Must be a positive number')
	}),
	new Field({
		fieldName: 'deposit',
		title: 'Deposit (KD)',
		inputType: 'number',
		validation: yup
			.number()
			.transform((currentValue, originalValue) => {
				return originalValue === '' ? null : currentValue;
			})
			.nullable()
			.typeError('Amount must be a number')
			.positive()
	}),
	new Field({
		fieldName: 'license',
		title: 'License',
		validation: yup.string()
	}),
	new Field({
		fieldName: 'Lease_id',
		title: 'Lease ID',
		editable: false
	}),
	new Field({
		fieldName: 'unit_id',
		title: 'Unit ID',
		editable: false
	})
]);
const info = { title, graphQlName, docs, fieldList };
export default info;
