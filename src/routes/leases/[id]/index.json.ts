import { fieldList } from '../leases';
import {
	DeleteLeaseDocument,
	InsertLeaseDocument,
	LeaseByIdDocument,
	LeaseListDocument,
	UpdateLeaseDocument
} from '$generated/graphql';
import { gql } from '@urql/svelte';

const docs = {
	delete: DeleteLeaseDocument,
	list: LeaseListDocument,
	insert: InsertLeaseDocument,
	byId: LeaseByIdDocument
};

const update5 = gql`
	mutation FiveLease($id: Int!, $_set: leases_set_input) {
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

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	return {
		body: {
			docs: docs,
			sdocs: JSON.stringify(docs),
			updateDoc: UpdateLeaseDocument.loc.source,
			fieldList: fieldList,
			graphqlName: 'leases_by_pk',
			update5: update5
		}
	};
}
