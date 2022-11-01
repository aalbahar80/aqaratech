<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';

	export let data: PageData;
</script>

<RangeSelect />

<BarChart expenses={data.expenses} />

<a href="expenses/table">Table</a>

<pre>{JSON.stringify(
		{
			income: data.expenses,
		},
		null,
		2,
	)}</pre>
