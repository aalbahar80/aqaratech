<script lang="ts">
	import type { PageData } from './$types';
	import TenantList from '$lib/components/tenant/TenantList.svelte';

	export let data: PageData;
</script>

<TenantList tenants={data.tenants} />
