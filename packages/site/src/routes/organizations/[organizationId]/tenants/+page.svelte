<script lang="ts">
	import TenantTable from '$lib/components/tenant/TenantTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<TenantTable data={data.tenants} />
