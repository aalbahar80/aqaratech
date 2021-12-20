<script lang="ts">
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
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

	$: crumbData = {
		clientId:
			$crumbs?.data?.tenants_by_pk?.leases[0]?.unit?.property?.client?.id,
		propertyId: $crumbs?.data?.tenants_by_pk?.leases[0]?.unit?.property?.id,
		unitId: $crumbs?.data?.tenants_by_pk?.leases[0]?.unit?.id,
		leaseId: $crumbs?.data?.tenants_by_pk?.leases[0]?.id,
		tenantId: $crumbs?.data?.tenants_by_pk?.id
	};

	$: loading = $crumbs.fetching || $crumbs.stale;
</script>

<BreadCrumbs {...crumbData} {loading} />
