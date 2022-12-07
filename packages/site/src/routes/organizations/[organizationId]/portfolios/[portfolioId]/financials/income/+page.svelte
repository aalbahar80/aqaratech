<script lang="ts">
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;
</script>

<div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
	<PieChart income={data.income} />

	<div class="xl:col-span-2">
		<BarChart income={data.income} />
	</div>
</div>
