<script lang="ts">
	import type { LayoutData } from './$types';

	import LinkData from '$lib/components/dashboard/LinkData.svelte';

	import StatsExpenses from './StatsExpenses.svelte';

	export let data: LayoutData;
</script>

<StatsExpenses expenses={data.expensesByMonth} />

<slot />

<LinkData dataType="Expenses" />
