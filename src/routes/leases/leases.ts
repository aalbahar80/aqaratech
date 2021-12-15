import { Field, FieldList } from '$components/form/Field';
import { DeleteLeaseDocument, LeaseListDocument } from '$generated/graphql';
import * as yup from 'yup';

const title = 'Leases';
const graphQlName = 'leases';

const docs = {
	delete: DeleteLeaseDocument,
	list: LeaseListDocument
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
		validation: yup.date().required().typeError('Invalid Date')
	}),
	new Field({
		fieldName: 'end_date',
		title: 'End',
		inputType: 'date',
		validation: yup
			.date()
			// .min(parseDate(yup.ref('start_date').getValue))
			.when(
				'start_date',
				(start_date, yup) =>
					start_date &&
					yup.min(start_date, 'End date cannot be before start date')
			)
			.required()
			.typeError('Invalid Date')
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
