import { fieldList } from '../leases';
import { LeaseByIdDocument, LeaseListDocument } from '$generated/graphql';
import { gql } from '@urql/svelte';

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

const del = gql`
	mutation DeleteLease($id: Int!) {
		delete_leases_by_pk(id: $id) {
			id
		}
	}
`;

const docs = {
	insert: insert,
	update: update,
	del: del,
	list: LeaseListDocument,
	byId: LeaseByIdDocument
};
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	return {
		body: {
			docs: docs,
			fieldList: fieldList,
			graphqlName: 'leases_by_pk'
		}
	};
}
