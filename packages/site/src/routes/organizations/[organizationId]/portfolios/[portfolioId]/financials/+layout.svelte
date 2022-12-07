<script lang="ts">
	import { page } from '$app/stores';
	import Filter from '$lib/components/dashboard/filter/Filter.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const hideRangePaths = ['financials/summary', 'payouts/table'];
	const hidePropertyPaths = ['payouts/table'];
</script>

<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
	<div
		class="flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow lg:items-start lg:justify-start"
	>
		<div class="block pb-2 text-sm font-medium text-gray-700">Name</div>
		<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:tracking-tight">
			{data.portfolio.fullName}
		</h2>
	</div>

	<div class="lg:col-span-2">
		<!-- Dashboard Filter -->
		<Filter
			properties={data.properties}
			units={data.units}
			hideRange={hideRangePaths.some((str) => $page.url.pathname.endsWith(str))}
			hideProperty={hidePropertyPaths.some((str) =>
				$page.url.pathname.endsWith(str),
			)}
		/>
	</div>
</div>

<slot />
