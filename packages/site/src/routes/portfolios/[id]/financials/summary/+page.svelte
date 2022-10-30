<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<pre>{JSON.stringify(
		{
			net: data.net,
			income: data.income,
			expenses: data.expenses,
			properties: data.properties,
		},
		null,
		2,
	)}</pre>
