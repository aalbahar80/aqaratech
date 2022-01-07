<script lang="ts">
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import type { TenantIdScreen } from '$routes/tenants/_[id].gql';

	export let loading: boolean;
	export let tenant: TenantIdScreen['tenants_by_pk'];

	$: crumbData = {
		clientId: tenant?.leases[0]?.unit?.property?.client?.id,
		propertyId: tenant?.leases[0]?.unit?.property?.id,
		unitId: tenant?.leases[0]?.unit?.id,
		leaseId: tenant?.leases[0]?.id,
		tenantId: tenant?.id,
	};
</script>

<BreadCrumbs {...crumbData} {loading} />
