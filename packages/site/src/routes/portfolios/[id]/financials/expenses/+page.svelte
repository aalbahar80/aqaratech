<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<RangeSelect />

<a href="expenses/table">Table</a>

<pre>{JSON.stringify(
		{
			income: data.expenses,
		},
		null,
		2,
	)}</pre>
