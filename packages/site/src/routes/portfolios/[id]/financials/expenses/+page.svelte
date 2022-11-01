<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';

	export let data: PageData;
</script>

<RangeSelect />

<a href="expenses/table">Table</a>

<BarChart expenses={data.expenses} />
