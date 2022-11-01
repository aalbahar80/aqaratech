<script lang="ts">
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';
	import TotalPane from './TotalPane.svelte';

	export let data: PageData;

	// add percentage change
	$: net = data.net.map((d, i) => {
		if (i === 0) return d;
		const pctChange =
			(d.amount - data.net[i - 1].amount) / data.net[i - 1].amount;
		return {
			...d,
			// percent change
			chipText:
				pctChange > 0
					? `+${(pctChange * 100).toFixed(2)}%`
					: `${(pctChange * 100).toFixed(2)}%`,
			color: pctChange > 0 ? 'green' : 'red',
		};
	});
</script>

<h1>Summary</h1>

<!-- Filters -->

<RangeSelect />

<PropertySelect properties={data.properties.results} />

<!-- TotalPanes -->

<TotalPane title="Net" data={net} />

<TotalPane title="Income" data={data.income.paid} />

<TotalPane title="Expenses" data={data.expenses} />
