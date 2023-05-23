<script lang="ts">
	import type { PageData } from './$types';

	import BarChart from './BarChart.svelte';

	import PieCharts from '$lib/components/leaseInvoice/PieCharts.svelte';

	export let data: PageData;

	$: empty = data.sumIncome.paid === 0 && data.sumIncome.unpaid === 0;
</script>

<PieCharts aggregate={data.invoices.aggregate} />

<!-- /aggregate endpoint, which provides data grouped by month, does not respect the rangeKind filter. -->
<BarChart
	income={data.income}
	{empty}
/>
