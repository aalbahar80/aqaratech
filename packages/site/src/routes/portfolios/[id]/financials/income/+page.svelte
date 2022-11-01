<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;
</script>

<RangeSelect />

<a href="income/table">Table</a>

<PieChart income={data.income} />

<BarChart income={data.income} />
