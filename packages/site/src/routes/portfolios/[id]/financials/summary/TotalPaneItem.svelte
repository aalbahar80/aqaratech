<script lang="ts">
	import clsx from 'clsx';
	import HeroiconsArrowDown20Solid from '~icons/heroicons/arrow-down-20-solid';
	import HeroiconsArrowUp20Solid from '~icons/heroicons/arrow-up-20-solid';

	// Text
	export let primaryText: string;
	export let secondaryText: string;

	// Values
	export let primaryValue: number | string;

	// Chips
	export let color: 'green' | 'red' = 'green';
	export let chipText: string;
</script>

<div class="px-4 py-5 sm:p-6">
	<dt class="text-base font-normal text-gray-900">{primaryText}</dt>
	<dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
		<div class="flex items-baseline text-2xl font-semibold text-indigo-600">
			{primaryValue}
			<span class="ml-2 text-sm font-medium text-gray-500">{secondaryText}</span
			>
		</div>

		<div
			class={clsx(
				'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
				color === 'green'
					? 'bg-green-100 text-green-800'
					: 'bg-red-100 text-red-800',
			)}
		>
			{#if color === 'green'}
				<HeroiconsArrowUp20Solid
					class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
				/>
			{:else}
				<HeroiconsArrowDown20Solid
					class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
				/>
			{/if}
			{chipText}
		</div>
	</dd>
</div>
