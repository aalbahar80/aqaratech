<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a href="expenses/table">Table</a>

<pre>{JSON.stringify(
		{
			income: data.expenses,
		},
		null,
		2,
	)}</pre>
