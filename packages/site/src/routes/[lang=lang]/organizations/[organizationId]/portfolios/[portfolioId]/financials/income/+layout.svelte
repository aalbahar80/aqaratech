<script lang="ts">
	import type { LayoutData } from './$types';

	import StatsIncome from './StatsIncome.svelte';

	import LinkData from '$lib/components/dashboard/LinkData.svelte';

	export let data: LayoutData;
</script>

<StatsIncome {data} />

<slot />

<LinkData dataType="Income" />
