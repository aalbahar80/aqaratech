<script lang="ts">
	import { gql, operationStore, query } from '@urql/svelte';

	export let id: string;

	const crumbsText = gql`
		query CrumbsTenant($id: Int!) {
			tenants_by_pk(id: $id) {
				id
				leases(order_by: { end_date: desc }, limit: 1) {
					id
					unit {
						id
						property {
							id
							client {
								id
							}
						}
					}
				}
			}
		}
	`;

	const crumbs = operationStore(crumbsText, { id });
	query(crumbs);
</script>

<br />
<br />
<p>{JSON.stringify($crumbs?.data)}</p>
