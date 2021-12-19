import { gql } from '@urql/svelte';
import { Field } from '$components/form/Field';
import type { entity } from './types';

const title = 'Clients';
const graphqlName = 'clients';
const graphqlNamePk = 'clients_by_pk';

const clientDetailsFragment = gql`
	fragment details on clients {
		id
		first_name
		last_name
		email
		phone
		civilid
		is_active
	}
`;

const insert = gql`
	mutation ClientsInsert($object: clients_insert_input = {}) {
		insert_clients_one(object: $object) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const update = gql`
	mutation ClientsUpdate($id: Int!, $_set: clients_set_input) {
		update_clients_by_pk(pk_columns: { id: $id }, _set: $_set) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const deleteQuery = gql`
	mutation DeleteClients($id: Int!) {
		delete_clients_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query ClientsById($id: Int!) {
		clients_by_pk(id: $id) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const list = gql`
	query ClientsList(
		$limit: Int
		$offset: Int
		$order_by: [clients_order_by!] = {}
	) {
		clients(order_by: $order_by, limit: $limit, offset: $offset) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const fieldList: Field[] = [
	new Field({ fieldName: 'id', title: 'ID', editable: false }),
	new Field({
		fieldName: 'first_name',
		title: 'First Name'
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name'
	}),
	new Field({
		fieldName: 'email',
		title: 'Email'
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone'
	})
];

const docs = {
	insert: insert,
	update: update,
	del: deleteQuery,
	list: list,
	byId: byId
};

export default <entity>{
	title,
	graphqlName,
	graphqlNamePk,
	docs,
	fieldList
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
