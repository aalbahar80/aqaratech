<script lang="ts">
	import { page } from '$app/stores';
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import UnitSelect from '$lib/components/dashboard/UnitSelect.svelte';
	import type { LayoutData } from './$types';
	import PopoverDivider from '$lib/components/popover/PopoverDivider.svelte';

	export let data: LayoutData;

	const hideRange = ['financials/summary', 'payouts/table'];
	const hideProperty = ['payouts/table'];
</script>

<h2
	class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
>
	{data.portfolio.fullName}
</h2>

<PopoverDivider />

<!-- Dashboard Filter -->
<div class="grid grid-cols-2 gap-8 gap-x-2 md:gap-8">
	{#if !hideRange.some((str) => $page.url.pathname.endsWith(str))}
		<div class="col-span-full">
			<DateFilter />
		</div>
	{/if}

	{#if !hideProperty.some((str) => $page.url.pathname.endsWith(str))}
		<div>
			<PropertySelect items={data.properties.results} />
		</div>

		<div>
			<UnitSelect items={data.units.results} />
		</div>
	{/if}
</div>

<slot />
