<script lang="ts">
	import SummaryStats from '$lib/components/dashboard/stats/SummaryStats.svelte';
	import PopoverDivider from '$lib/components/popover/PopoverDivider.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="pt-4">
	<PopoverDivider />
</div>
<!-- TotalPanes -->
<div class="flex flex-col gap-y-12">
	<SummaryStats title="Net" data={data.net} />

	<SummaryStats title="Income" data={data.income.paid} />

	<SummaryStats title="Expenses" data={data.expenses} />
</div>
