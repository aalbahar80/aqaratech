<script lang="ts">
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Summary</h1>

<RangeSelect />
<PropertySelect properties={data.properties.results} />

<!-- Net -->
<h2>Net</h2>

<p>This month:</p>
<pre>{JSON.stringify(data.net[0], null, 2)}</pre>

<p>Last month:</p>
<pre>{JSON.stringify(data.net[1], null, 2)}</pre>

<!-- Income -->

<h2>Income</h2>

<p>This month:</p>
<pre>{JSON.stringify(data.income.paid[0], null, 2)}</pre>

<p>Last month:</p>
<pre>{JSON.stringify(data.income.paid[1], null, 2)}</pre>

<!-- Expenses -->

<h2>Expenses</h2>

<p>This month:</p>
<pre>{JSON.stringify(data.expenses[0], null, 2)}</pre>

<p>Last month:</p>
<pre>{JSON.stringify(data.expenses[1], null, 2)}</pre>

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
