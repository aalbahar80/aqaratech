<script lang="ts">
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;
</script>

<PieChart income={data.income} />

<BarChart income={data.income} />
