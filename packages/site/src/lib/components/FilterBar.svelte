<script lang="ts">
	import FilterCheckbox from '$lib/components/filter/FilterCheckbox.svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import FilterSlideover from '$lib/components/filter/FilterSlideover.svelte';
	import type { Filter } from '$lib/models/interfaces/filter.interface';

	export let sortOptions: Filter;
	export let filters: Filter[];

	let slideover: FilterSlideover | undefined;
</script>

<div class="bg-gray-50">
	<FilterSlideover bind:this={slideover} {filters} />

	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
		<!-- <div class="py-24">
			<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
				New Arrivals
			</h1>
			<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
				Thoughtfully designed objects for the workspace, home, and travel.
			</p>
		</div> -->

		<section
			aria-labelledby="filter-heading"
			class="border-t border-gray-200 py-6"
		>
			<h2 id="filter-heading" class="sr-only">Product filters</h2>

			<div class="flex items-center justify-between">
				<FilterRadio {sortOptions} />

				<button
					type="button"
					class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
					on:click={() => slideover?.open()}
				>
					Filters
				</button>
				{#each filters as section (section.name)}
					<FilterCheckbox {section} />
				{/each}
			</div>
		</section>
	</div>
</div>
