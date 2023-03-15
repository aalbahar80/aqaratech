<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getRoute, PageType } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import Filter from '$lib/components/dashboard/filter/Filter.svelte';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';

	export let data: LayoutData;

	const hideRangePaths = ['financials/summary', 'payouts/table'];
	const hidePropertyPaths = ['payouts/table'];
</script>

<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
	<div
		class="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow lg:items-start lg:justify-start"
	>
		<div class="flex items-center justify-between self-stretch pb-4">
			<div class="block text-sm font-medium text-gray-700">
				{$L.general.name()}
			</div>

			<RoleGuard roles={['ORGADMIN']}>
				<a
					class="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
					href={getRoute({
						entity: 'portfolio',
						id: data.portfolio.id,
						pageType: PageType.Id,
						params: $page.params,
					})}>{$L.general.details()}<Arrow /></a
				>
			</RoleGuard>
		</div>
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
