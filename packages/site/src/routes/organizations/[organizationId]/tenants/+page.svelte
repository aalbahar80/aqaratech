<script lang="ts">
	import TenantList from '$lib/components/tenant/TenantList.svelte';
	import TenantTable from '$lib/components/tenant/TenantTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<TenantList tenants={data.tenants} />

<TenantTable data={data.tenants} />
