<script lang="ts">
	import type { PageData } from './$types';

	import BarChart from './BarChart.svelte';

	import PieCharts from '$lib/components/leaseInvoice/PieCharts.svelte';

	export let data: PageData;

	$: empty = data.sumIncome.paid === 0 && data.sumIncome.unpaid === 0;
</script>

<div class="flex flex-col gap-4 sm:flex-row">
	<PieCharts aggregate={data.invoices.aggregate} />
</div>

<BarChart
	income={data.income}
	{empty}
/>
