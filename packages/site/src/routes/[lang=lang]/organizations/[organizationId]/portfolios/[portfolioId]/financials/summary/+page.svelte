<script lang="ts">
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import SummaryStats from '$lib/components/dashboard/stats/SummaryStats.svelte';
	import PopoverDivider from '$lib/components/popover/PopoverDivider.svelte';

	export let data: PageData;
</script>

<div class="pt-4">
	<PopoverDivider />
</div>
<!-- TotalPanes -->
<div class="flex flex-col gap-y-12">
	<SummaryStats
		title={$L.nav.net()}
		data={data.net}
		kind="Net"
	/>

	<SummaryStats
		title={$L.nav.income()}
		data={data.income.paid}
		kind="Income"
	/>

	<SummaryStats
		title={$L.entity.expense.plural()}
		data={data.expenses}
		kind="Expenses"
	/>
</div>
