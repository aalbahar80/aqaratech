<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
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

{#if !hideRange.some((str) => $page.url.pathname.endsWith(str))}
	<div class="inline-flex justify-end">
		<div class="w-72">
			<RangeSelect />
		</div>
	</div>
{/if}

{#if !hideProperty.some((str) => $page.url.pathname.endsWith(str))}
	<div class="inline-flex justify-end">
		<div class="w-72">
			<PropertySelect items={data.properties.results} />
		</div>
	</div>
	<div class="inline-flex justify-end">
		<div class="w-72">
			<UnitSelect items={data.units.results} />
		</div>
	</div>
{/if}

<slot />
