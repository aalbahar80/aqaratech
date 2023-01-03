<script lang="ts">
	import type { LayoutData } from './$types';

	import LinkData from '$lib/components/dashboard/LinkData.svelte';

	import StatsIncome from './StatsIncome.svelte';

	export let data: LayoutData;
</script>

<StatsIncome {data} />

<slot />

<LinkData dataType="Income" />
