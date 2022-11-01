<script lang="ts">
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import type { PageData } from './$types';
	import TotalPane from './TotalPane.svelte';

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
	<TotalPane title="Net" data={data.net} />

	<TotalPane title="Income" data={data.income.paid} />

	<TotalPane title="Expenses" data={data.expenses} />
</div>
