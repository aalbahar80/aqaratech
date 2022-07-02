<script lang="ts">
	import type { UnitDto } from '@self/sdk';
	import { Calendar } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let unit: UnitDto;
	export let icons: any[];
</script>

<a href={`/units/${unit.id}`} class="block hover:bg-gray-50" sveltekit:prefetch>
	<div class="px-4 py-4 sm:px-6">
		<div class="flex items-center justify-between">
			<p class="truncate text-sm font-medium text-indigo-600">
				{unit.unitNumber}
				<span dir="auto">
					{unit.type ?? ''}
				</span>
			</p>
			{#if unit.vacancy}
				<div class="ml-2 flex flex-shrink-0">
					<p
						class={'inline-flex rounded-full px-2 text-xs font-semibold leading-5'}
						class:badge-green={unit.vacancy.isVacant}
						class:badge-yellow={!unit.vacancy.isVacant}
					>
						{unit.vacancy.isVacant ? 'Vacant' : 'Occupied'}
					</p>
				</div>
			{/if}
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<div class="sm:flex sm:space-x-4">
				{#each icons as { label, icon, tooltip } (tooltip)}
					{#if label}
						<p class="flex items-center text-sm text-gray-500">
							<svelte:component
								this={icon}
								class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
							/>
							{label}
						</p>
					{/if}
				{/each}
			</div>
			<!-- bug: null is being typecasted to 1/1/1970 -->
			{#if unit.vacancy?.vacancyDistance && unit.vacancy.vacancyDate}
				<!-- <pre>{JSON.stringify(unit.vacancy, null, 2)}</pre> -->
				<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
					<Icon
						src={Calendar}
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					<p>
						Vacancy:
						<time dateTime={unit.vacancy.vacancyDate.toISOString()}>
							{unit.vacancy.vacancyDistance}</time
						>
					</p>
				</div>
			{/if}
		</div>
	</div>
</a>

<style lang="postcss">
	.badge-green {
		@apply bg-green-100 text-green-800;
	}
	.badge-yellow {
		@apply bg-yellow-100 text-yellow-800;
	}
</style>
