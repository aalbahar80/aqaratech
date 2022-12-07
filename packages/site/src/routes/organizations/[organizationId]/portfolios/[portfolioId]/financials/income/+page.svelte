<script lang="ts">
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;

	$: empty = data.sumIncome.paid === 0 && data.sumIncome.unpaid === 0;
</script>

<div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
	<PieChart paid={data.sumIncome.paid} unpaid={data.sumIncome.unpaid} {empty} />

	<div class="xl:col-span-2">
		<BarChart income={data.income} {empty} />
	</div>
</div>
