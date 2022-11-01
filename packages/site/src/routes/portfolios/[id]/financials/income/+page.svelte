<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import Statistics from '$lib/components/dashboard/stats/Statistics.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;
</script>

<RangeSelect />

<a href="income/table">Table</a>

<Statistics title="Collected" data={data.income.paid} />

<Statistics title="Uncollected" data={data.income.unpaid} />

<PieChart income={data.income} />

<BarChart income={data.income} />
