<script lang="ts">
	import { page } from '$app/stores';
	import Filter from '$lib/components/dashboard/filter/Filter.svelte';
	import PopoverDivider from '$lib/components/popover/PopoverDivider.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const hideRangePaths = ['financials/summary', 'payouts/table'];
	const hidePropertyPaths = ['payouts/table'];
</script>

<h2
	class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
>
	{data.portfolio.fullName}
</h2>

<div class="py-4">
	<PopoverDivider />
</div>

<!-- Dashboard Filter -->
<Filter
	properties={data.properties}
	units={data.units}
	hideRange={hideRangePaths.some((str) => $page.url.pathname.endsWith(str))}
	hideProperty={hidePropertyPaths.some((str) =>
		$page.url.pathname.endsWith(str),
	)}
/>

<slot />
