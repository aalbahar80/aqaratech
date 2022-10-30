<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<pre>{JSON.stringify(
		{
			income: data.income,
		},
		null,
		2,
	)}</pre>

<a href="income/table">Table</a>
