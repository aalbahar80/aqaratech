<script lang="ts">
	import type { LayoutData } from './$types';

	import TenantPage from '$lib/components/tenant/TenantPage.svelte';
	import TenantTabs from '$lib/components/tenant/TenantTabs.svelte';

	export let data: LayoutData;
</script>

<TenantPage tenant={data.tenant} />

<TenantTabs />

<slot />
