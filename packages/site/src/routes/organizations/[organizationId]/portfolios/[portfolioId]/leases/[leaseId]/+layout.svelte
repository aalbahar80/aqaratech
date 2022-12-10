<script lang="ts">
	import LeasePage from '$lib/components/lease/LeasePage.svelte';
	import LeaseTabs from '$lib/components/lease/LeaseTabs.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<LeasePage lease={data.lease} />

<LeaseTabs />

<slot />
