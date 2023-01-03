<script lang="ts">
	import type { PageData } from './$types';

	import TenantTable from '$lib/components/tenant/TenantTable.svelte';

	export let data: PageData;
</script>

<TenantTable data={data.tenants} />
