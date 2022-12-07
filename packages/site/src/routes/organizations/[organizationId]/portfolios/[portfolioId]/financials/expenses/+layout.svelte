<script lang="ts">
	import DataTabs from '../DataTabs.svelte';
	import type { LayoutData } from './$types';
	import StatsExpenses from './StatsExpenses.svelte';

	export let data: LayoutData;
</script>

<DataTabs dataType="Expenses" />

<StatsExpenses expenses={data.expensesByMonth} />

<slot />
