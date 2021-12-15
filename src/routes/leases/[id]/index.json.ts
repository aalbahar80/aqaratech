import {
	DeleteLeaseDocument,
	InsertLeaseDocument,
	LeaseByIdDocument,
	LeaseByIdQuery,
	LeaseByIdQueryVariables,
	LeaseListDocument,
	UpdateLeaseDocument
} from '$generated/graphql';
import { query, operationStore } from '@urql/svelte';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { id } = params;

	const lease = operationStore<LeaseByIdQuery, LeaseByIdQueryVariables>(
		LeaseByIdDocument,
		{ id: id }
	);
	query(lease);

	if (lease.data.leases_by_pk) {
		return {
			body: { x: lease.data.leases_by_pk, y: 'som' }
		};
	}
}
