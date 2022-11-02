<script lang="ts">
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import type { PageData } from './$types';
	import SummaryStats from './SummaryStats.svelte';

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
	<SummaryStats title="Net" data={data.net} />

	<SummaryStats title="Income" data={data.income.paid} />

	<SummaryStats title="Expenses" data={data.expenses} />
</div>
