<script lang="ts">
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import { TenantBreadcrumbsDocument } from './_CrumbsCarbon.gql';
	import { query, operationStore } from '@urql/svelte';
	import { page } from '$app/stores';
	import { TenantBreadcrumbsLocalDocument } from '$generated/graphql';

	$: id = parseInt($page.params.id);

	const crumbs = operationStore(TenantBreadcrumbsDocument, { id });
	query(crumbs);

	const crumbsLocal = operationStore(TenantBreadcrumbsLocalDocument, { id });
	query(crumbsLocal);
	// reassign query variables to retrigger query
	$: crumbs.variables = { id };
	$: crumbsLocal.variables = { id };
	$: console.log($crumbsLocal);

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
