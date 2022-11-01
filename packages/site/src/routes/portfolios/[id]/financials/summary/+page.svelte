<script lang="ts">
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import Statistics from '$lib/components/dashboard/stats/Statistics.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold text-gray-900">Summary</h1>

<!-- Filters -->

<div class="inline-flex justify-end">
	<div class="w-72">
		<PropertySelect properties={data.properties.results} />
	</div>
</div>

<!-- TotalPanes -->
<div class="flex flex-col gap-y-12">
	<Statistics title="Net" data={data.net} />

	<Statistics title="Income" data={data.income.paid} />

	<Statistics title="Expenses" data={data.expenses} />
</div>
