<script lang="ts">
	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import L from '$i18n/i18n-svelte';
	import FilterCheckbox from '$lib/components/filter/FilterCheckbox.svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import FilterSlideover from '$lib/components/filter/FilterSlideover.svelte';

	export let persistent: Filter[] = [];
	export let responsive: Filter[] = [];

	let slideover: FilterSlideover | undefined;
</script>

<div class="rounded-lg bg-white shadow">
	<FilterSlideover bind:this={slideover} filters={responsive} />

	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-full lg:px-8">
		<slot name="hero" />

		<section aria-labelledby="filter-heading" class="py-6">
			<h2 id="filter-heading" class="sr-only">{$L.filter.filters()}</h2>

			<div class="flex  flex-row-reverse items-center justify-between">
				{#each persistent as filter, idx (filter.id)}
					<FilterRadio
						{filter}
						label={filter.label}
						align={idx === 0 ? 'left' : 'right'}
					/>
				{/each}

				{#each responsive as filter (filter.id)}
					<FilterCheckbox {filter} />
				{/each}
				{#if responsive.length}
					<button
						type="button"
						class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
						on:click={() => {
							if (slideover?.open) {
								slideover.open();
							}
						}}
					>
						{$L.filter.filters()}
					</button>
				{/if}

				<slot name="custom" />
			</div>
		</section>
	</div>
</div>
