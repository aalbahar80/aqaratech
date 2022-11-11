<script lang="ts">
	import SummaryStats from '$lib/components/dashboard/stats/SummaryStats.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- TotalPanes -->
<div class="flex flex-col gap-y-12">
	<SummaryStats title="Net" data={data.net} />

	<SummaryStats title="Income" data={data.income.paid} />

	<SummaryStats title="Expenses" data={data.expenses} />
</div>
