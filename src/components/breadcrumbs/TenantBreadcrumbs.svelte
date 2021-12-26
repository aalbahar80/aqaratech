<script lang="ts">
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import { query, operationStore } from '@urql/svelte';
	import { page } from '$app/stores';
	import { TenantBreadcrumbsDocument } from '$routes/tenants/_[id].gql';

	$: id = parseInt($page.params.id);

	const crumbs = operationStore(TenantBreadcrumbsDocument, { id });
	query(crumbs);

	// reassign query variables to retrigger query
	$: crumbs.variables = { id };

	$: crumbData = {
		clientId:
			$crumbs?.data?.tenants_by_pk?.leases[0]?.unit?.property?.client?.id,
		propertyId: $crumbs?.data?.tenants_by_pk?.leases[0]?.unit?.property?.id,
		unitId: $crumbs?.data?.tenants_by_pk?.leases[0]?.unit?.id,
		leaseId: $crumbs?.data?.tenants_by_pk?.leases[0]?.id,
		tenantId: $crumbs?.data?.tenants_by_pk?.id,
	};
</script>

<BreadCrumbs {...crumbData} loading={$crumbs.fetching || $crumbs.stale} />
