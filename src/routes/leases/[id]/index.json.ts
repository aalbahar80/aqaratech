import { gql } from '@urql/svelte';
import { Field } from '$components/form/Field';
const title = 'Leases';
const graphqlName = 'leases';
const graphqlNamePk = 'leases_by_pk';

const leasesDetailsFragment = gql`
	fragment leasesDetails on leases {
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
`;

const insert = gql`
	mutation LeasesInsert($object: leases_insert_input = {}) {
		insert_leases_one(object: $object) {
			...leasesDetails
		}
	}
	${leasesDetailsFragment}
`;

const update = gql`
	mutation LeasesUpdate($id: Int!, $_set: leases_set_input) {
		update_leases_by_pk(pk_columns: { id: $id }, _set: $_set) {
			...leasesDetails
		}
	}
	${leasesDetailsFragment}
`;

const deleteQuery = gql`
	mutation DeleteLeases($id: Int!) {
		delete_leases_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query LeasesById($id: Int!) {
		leases_by_pk(id: $id) {
			...leasesDetails
			unit {
				id
				client_id_s
				property_id
			}
		}
	}
	${leasesDetailsFragment}
`;

const list = gql`
	query LeasesList(
		$limit: Int
		$offset: Int
		$order_by: [leases_order_by!] = {}
	) @cached {
		leases(order_by: $order_by, limit: $limit, offset: $offset) {
			...leasesDetails
		}
	}
	${leasesDetailsFragment}
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
		inputType: 'date'
	}),
	new Field({
		fieldName: 'end_date',
		title: 'End',
		inputType: 'date'
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
		inputType: 'number'
	}),
	new Field({
		fieldName: 'deposit',
		title: 'Deposit (KD)',
		inputType: 'number'
	}),
	new Field({
		fieldName: 'license',
		title: 'License'
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
