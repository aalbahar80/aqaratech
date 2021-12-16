import { gql } from '@urql/svelte';
import { Field } from '$components/form/Field';
import * as yup from 'yup';

const title = 'Leases';
const graphqlName = 'leases';
const graphqlNamePk = 'leases_by_pk';

const insert = gql`
	mutation LeaseInsert($object: leases_insert_input = {}) {
		insert_leases_one(object: $object) {
			id
			deposit
			end_date
			is_expired
			is_signed
			license
			monthly_rent
			start_date
			tenant_id
			unit_id
		}
	}
`;

const update = gql`
	mutation LeaseUpdate($id: Int!, $_set: leases_set_input) {
		update_leases_by_pk(pk_columns: { id: $id }, _set: $_set) {
			id
			deposit
			end_date
			is_expired
			is_signed
			license
			monthly_rent
			start_date
			tenant_id
			unit_id
		}
	}
`;

const deleteQuery = gql`
	mutation DeleteLease($id: Int!) {
		delete_leases_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query LeaseById($id: Int!) {
		leases_by_pk(id: $id) {
			id
			start_date
			end_date
			is_expired
			is_signed
			monthly_rent
			license
			deposit
			tenant_id
			unit_id
			unit {
				id
				client_id_s
				property_id
			}
		}
	}
`;

const list = gql`
	query LeaseList($limit: Int, $offset: Int, $order_by: [leases_order_by!] = {})
	@cached {
		leases(order_by: $order_by, limit: $limit, offset: $offset) {
			id
			start_date
			end_date
			is_expired
			is_signed
			monthly_rent
			deposit
			license
			tenant_id
			unit_id
		}
	}
`;

const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'start_date',
		title: 'Start',
		inputType: 'date',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'end_date',
		title: 'End',
		inputType: 'date',
		validation: yup.string().required()
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
];

const docs = {
	insert: insert,
	update: update,
	del: deleteQuery,
	list: list,
	byId: byId
};
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	return {
		body: {
			title,
			graphqlName,
			graphqlNamePk,
			docs: docs,
			fieldList: fieldList
		}
	};
}
