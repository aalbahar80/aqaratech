<script lang="ts">
	import type { LayoutData } from './$types';

	import StatsExpenses from './StatsExpenses.svelte';

	import LinkData from '$lib/components/dashboard/LinkData.svelte';

	export let data: LayoutData;
</script>

<StatsExpenses expenses={data.expensesByMonth} />

<slot />

<LinkData dataType="Expenses" />
