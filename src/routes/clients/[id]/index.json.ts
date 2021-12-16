import { gql } from '@urql/svelte';
import { Field } from '$components/form/Field';
import * as yup from 'yup';

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
	mutation ClientInsert($object: clients_insert_input = {}) {
		insert_clients_one(object: $object) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const update = gql`
	mutation ClientUpdate($id: Int!, $_set: clients_set_input) {
		update_clients_by_pk(pk_columns: { id: $id }, _set: $_set) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const deleteQuery = gql`
	mutation DeleteClient($id: Int!) {
		delete_clients_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query ClientById($id: Int!) {
		clients_by_pk(id: $id) {
			...details
		}
	}
	${clientDetailsFragment}
`;

const list = gql`
	query ClientList(
		$limit: Int
		$offset: Int
		$order_by: [clients_order_by!] = {}
	) @cached {
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
		title: 'First Name',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
		validation: yup.string().email()
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		validation: yup.string().matches(/^[0-9]{8}$/, {
			message: 'Must be an 8 digit number',
			excludeEmptyString: true
		})
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
