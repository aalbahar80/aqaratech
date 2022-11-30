<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import UnitSelect from '$lib/components/dashboard/UnitSelect.svelte';
	import { FilterInitial } from '$lib/stores/filter/Filter.enum';
	import type { LayoutData } from './$types';

	afterNavigate((nav) => {
		if (!nav.to?.url) {
			return;
		}

		const url = new URL(nav.to.url);

		// remove any initial filter search params from the URL
		const keys = [FilterInitial.Property, FilterInitial.Unit];

		// do nothing if there are no keys to remove
		if (!keys.some((key) => url.searchParams.has(key))) {
			console.log('no keys to remove');
			return;
		}

		for (const key of keys) {
			if (url.searchParams.has(key)) {
				console.log(`Removing ${key} from URL`);
				url.searchParams.delete(key);
			}
		}

		// update visible url
		window.history.replaceState({}, '', url.href);
	});

	export let data: LayoutData;

	const hideRange = ['financials/summary', 'payouts/table'];
	const hideProperty = ['payouts/table'];
</script>

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
