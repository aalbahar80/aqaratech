import { gql } from '@urql/core';
import { Field } from '$components/form/Field';
import type { entity } from './types';

const title = 'Tenants';
const graphqlName = 'tenants';
const graphqlNamePk = 'tenants_by_pk';

const tenantsDetailsFragment = gql`
	fragment tenantsDetails on tenants {
		id
		first_name
		last_name
		email
		phone
		dob
		civilid
		second_name
		third_name
	}
`;

// const tenantsCrumbsFragment = gql`
// 	fragment tenantsCrumbs on tenants {
// 		id
// 		leases(order_by: { end_date: desc }, limit: 1) {
// 			id
// 			start_date
// 			end_date
// 			unit {
// 				id
// 				property {
// 					id
// 					client {
// 						id
// 					}
// 				}
// 			}
// 		}
// 	}
// `;

const insert = gql`
	mutation TenantsInsert($object: tenants_insert_input = {}) {
		insert_tenants_one(object: $object) {
			...tenantsDetails
		}
	}
	${tenantsDetailsFragment}
`;

const update = gql`
	mutation TenantsUpdate($id: Int!, $_set: tenants_set_input) {
		update_tenants_by_pk(pk_columns: { id: $id }, _set: $_set) {
			...tenantsDetails
		}
	}
	${tenantsDetailsFragment}
`;

const deleteQuery = gql`
	mutation DeleteTenants($id: Int!) {
		delete_tenants_by_pk(id: $id) {
			id
		}
	}
`;

const byId = gql`
	query TenantsById($id: Int!) {
		tenants_by_pk(id: $id) {
			...tenantsDetails
		}
	}
	${tenantsDetailsFragment}
`;

const list = gql`
	query TenantsList(
		$limit: Int
		$offset: Int
		$order_by: [tenants_order_by!] = {}
	) {
		tenants(order_by: $order_by, limit: $limit, offset: $offset) {
			...tenantsDetails
		}
	}
	${tenantsDetailsFragment}
`;

const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'first_name',
		title: 'First Name',
		inputType: 'text'
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		inputType: 'text'
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
		inputType: 'email'
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		inputType: 'tel'
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
