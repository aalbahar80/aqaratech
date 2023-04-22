<script lang="ts">
	import type { PageData } from './$types';

	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	import { rangeKind } from '$lib/stores/filter/range';

	export let data: PageData;

	$: empty = data.sumIncome.paid === 0 && data.sumIncome.unpaid === 0;
</script>

<div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
	<PieChart
		paid={data.sumIncome.paid}
		unpaid={data.sumIncome.unpaid}
		{empty}
	/>

	<div class="xl:col-span-2">
		<!-- /aggregate endpoint, which provides data grouped by month, does not respect the rangeKind filter. -->
		<BarChart
			income={data.income}
			empty={empty || $rangeKind !== 'postAt'}
		/>
	</div>
</div>
