<script lang="ts">
	import TenantPage from '$lib/components/tenant/TenantPage.svelte';
	import TenantTabs from '$lib/components/tenant/TenantTabs.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<TenantPage tenant={data.tenant} />

<TenantTabs />

<slot />
