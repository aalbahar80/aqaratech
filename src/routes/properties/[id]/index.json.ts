import { gql } from '@urql/svelte';
import { Field } from '$components/form/Field';
import * as yup from 'yup';

const title = 'Properties';
const graphqlName = 'properties';
const graphqlNamePk = 'properties_by_pk';

const propertiesDetailsFragment = gql`
	fragment propertiesDetails on properties {
		id
		client_id
		area
		block
		street
		avenue
		number
		coordinates
	}
`;

const insert = gql`
	mutation PropertyInsert($object: properties_insert_input = {}) {
		insert_properties_one(object: $object) {
			...propertiesDetails
		}
	}
	${propertiesDetailsFragment}
`;

const update = gql`
	mutation PropertyUpdate($id: Int!, $_set: properties_set_input) {
		update_properties_by_pk(pk_columns: { id: $id }, _set: $_set) {
			...propertiesDetails
		}
	}
	${propertiesDetailsFragment}
`;

const deleteQuery = gql`
	mutation DeleteProperty($id: Int!) {
		delete_properties_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query PropertyById($id: Int!) {
		properties_by_pk(id: $id) {
			...propertiesDetails
			units {
				id
				client_id_s
				property_id
			}
		}
	}
	${propertiesDetailsFragment}
`;

const list = gql`
	query PropertyList(
		$limit: Int
		$offset: Int
		$order_by: [properties_order_by!] = {}
	) @cached {
		properties(order_by: $order_by, limit: $limit, offset: $offset) {
			...propertiesDetails
		}
	}
	${propertiesDetailsFragment}
`;

const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'area',
		title: 'Area'
	}),
	new Field({
		fieldName: 'block',
		title: 'Block',
		validation: yup
			.number()
			.required()
			.min(1)
			.max(13)
			.typeError('Must be a number')
	}),
	new Field({
		fieldName: 'street',
		title: 'St',
		validation: yup
			.string()
			.required()
			.min(1)
			.max(13)
			.typeError('Must be a string')
	}),
	new Field({
		fieldName: 'avenue',
		title: 'Ave',
		visibile: false
	}),
	new Field({
		fieldName: 'number',
		title: 'Number'
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
