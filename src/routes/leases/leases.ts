import { Field, FieldList } from '$components/form/Field';
import {
	DeleteLeaseDocument,
	LeaseByIdDocument,
	LeaseListDocument
} from '$generated/graphql';
import * as yup from 'yup';

const title = 'Leases';
const graphQlName = 'leases';

const docs = {
	delete: DeleteLeaseDocument,
	list: LeaseListDocument,
	byId: LeaseByIdDocument
};

// refactor FieldList to array of Field objects
export const fieldList = new FieldList([
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
export const get = () => {
	return { body: 'something' };
};
export default info;
