<script lang="ts">
	import LinkData from '$lib/components/dashboard/LinkData.svelte';

	import StatsExpenses from './StatsExpenses.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<StatsExpenses expenses={data.expensesByMonth} />

<slot />

<LinkData dataType="Expenses" />
