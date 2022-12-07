<script lang="ts">
	import StatsExpenses from './StatsExpenses.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<StatsExpenses expenses={data.expensesByMonth} />

<slot />
