import { gql } from '@urql/svelte';
import { Field } from '$components/form/Field';
import type { entity } from './types';

const title = 'Units';
const graphqlName = 'units';
const graphqlNamePk = 'units_by_pk';

const unitsDetailsFragment = gql`
	fragment unitsDetails on units {
		id
		is_vacant
		rent_market
		size
		type
		unit_number
		usage
		bed
		bath
		floor
		property_id
	}
`;

const insert = gql`
	mutation UnitsInsert($object: units_insert_input = {}) {
		insert_units_one(object: $object) {
			...unitsDetails
		}
	}
	${unitsDetailsFragment}
`;

const update = gql`
	mutation UnitsUpdate($id: Int!, $_set: units_set_input) {
		update_units_by_pk(pk_columns: { id: $id }, _set: $_set) {
			...unitsDetails
		}
	}
	${unitsDetailsFragment}
`;

const deleteQuery = gql`
	mutation DeleteUnits($id: Int!) {
		delete_units_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query UnitsById($id: Int!) {
		units_by_pk(id: $id) {
			...unitsDetails
		}
	}
	${unitsDetailsFragment}
`;

const list = gql`
	query UnitsList(
		$limit: Int
		$offset: Int
		$order_by: [units_order_by!] = {}
	) {
		units(order_by: $order_by, limit: $limit, offset: $offset) {
			...unitsDetails
		}
	}
	${unitsDetailsFragment}
`;

const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
	}),
	new Field({
		fieldName: 'is_vacant',
		title: 'Vacant?',
		editable: false,
	}),
	new Field({
		fieldName: 'rent_market',
		title: 'Market Rent',
		inputType: 'number',
	}),
	new Field({
		fieldName: 'size',
		title: 'Size m²',
		inputType: 'number',
	}),
	new Field({
		fieldName: 'type',
		title: 'Type',
	}),
	new Field({
		fieldName: 'unit_number',
		title: 'Number',
	}),
	new Field({
		fieldName: 'usage',
		title: 'Usage',
	}),
	new Field({
		fieldName: 'bed',
		title: 'Beds',
		inputType: 'number',
	}),
	new Field({
		fieldName: 'bath',
		title: 'Baths',
		inputType: 'number',
	}),
	new Field({
		fieldName: 'floor',
		title: 'Floor',
	}),
];

const docs = {
	insert: insert,
	update: update,
	del: deleteQuery,
	list: list,
	byId: byId,
};

export default <entity>{
	title,
	graphqlName,
	graphqlNamePk,
	docs,
	fieldList,
};
