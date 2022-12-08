<script lang="ts">
	import LinkData from '$lib/components/dashboard/LinkData.svelte';
	import StatsIncome from './StatsIncome.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<StatsIncome {data} />

<slot />

<LinkData dataType="Income" />
