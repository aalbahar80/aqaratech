<script lang="ts">
	import type { LayoutData } from './$types';

	import LeasePage from '$lib/components/lease/LeasePage.svelte';
	import LeaseTabs from '$lib/components/lease/LeaseTabs.svelte';

	export let data: LayoutData;
</script>

<LeasePage lease={data.lease} />

<LeaseTabs />

<slot />
