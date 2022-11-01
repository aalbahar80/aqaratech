<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import HeroiconsArrowDown20Solid from '~icons/heroicons/arrow-down-20-solid';
	import HeroiconsArrowUp20Solid from '~icons/heroicons/arrow-up-20-solid';

	export let title: string;
	export let data: GroupByMonthDto[];
</script>

<div>
	<h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
	<dl
		class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x"
	>
		<div class="px-4 py-5 sm:p-6">
			<dt class="text-base font-normal text-gray-900">Total Subscribers</dt>
			<dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
				<div class="flex items-baseline text-2xl font-semibold text-indigo-600">
					71,897
					<span class="ml-2 text-sm font-medium text-gray-500">from 70,946</span
					>
				</div>

				<div
					class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0"
				>
					<HeroiconsArrowUp20Solid
						class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
					/>
					<span class="sr-only"> Increased by </span>
					12%
				</div>
			</dd>
		</div>

		<div class="px-4 py-5 sm:p-6">
			<dt class="text-base font-normal text-gray-900">Avg. Open Rate</dt>
			<dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
				<div class="flex items-baseline text-2xl font-semibold text-indigo-600">
					58.16%
					<span class="ml-2 text-sm font-medium text-gray-500">from 56.14%</span
					>
				</div>

				<div
					class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0"
				>
					<HeroiconsArrowUp20Solid
						class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
					/>
					<span class="sr-only"> Increased by </span>
					2.02%
				</div>
			</dd>
		</div>

		<div class="px-4 py-5 sm:p-6">
			<dt class="text-base font-normal text-gray-900">Avg. Click Rate</dt>
			<dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
				<div class="flex items-baseline text-2xl font-semibold text-indigo-600">
					24.57%
					<span class="ml-2 text-sm font-medium text-gray-500">from 28.62%</span
					>
				</div>

				<div
					class="inline-flex items-baseline rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 md:mt-2 lg:mt-0"
				>
					<HeroiconsArrowDown20Solid
						class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
					/>
					<span class="sr-only"> Decreased by </span>
					4.05%
				</div>
			</dd>
		</div>
	</dl>
</div>
