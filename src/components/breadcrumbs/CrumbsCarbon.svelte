<script lang="ts">
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import { TenantBreadcrumbsDocument } from './_CrumbsCarbon.gql';
	import { query, operationStore } from '@urql/svelte';
	import { page } from '$app/stores';

	const id = parseInt($page.params.id);
	$: console.log(id);

	const crumbs = operationStore(TenantBreadcrumbsDocument, { id });
	query(crumbs);

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
