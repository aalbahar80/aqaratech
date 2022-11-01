<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import Statistics from '$lib/components/dashboard/stats/Statistics.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;
</script>

<a href="income/table">Table</a>

<div class="inline-flex justify-end">
	<div class="w-72">
		<RangeSelect />
	</div>
</div>

<!-- TotalPanes -->
<div class="flex flex-col gap-y-12">
	<Statistics title="Collected" data={data.income.paid} />

	<Statistics title="Uncollected" data={data.income.unpaid} />
</div>

<PieChart income={data.income} />

<BarChart income={data.income} />
