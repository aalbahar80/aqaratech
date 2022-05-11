<script lang="ts">
	import { session } from '$app/stores';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { classMap } from '$lib/models/classes/all.class';
	import type { EntityTitle } from '$models/types/entity.type';

	export let entityTitle: EntityTitle;
	export let count: number;

	const hideActions = $session.authz?.role !== 'admin';
	const entity = classMap[entityTitle];

	export let createHref = `/new/${entity.plural}`;
</script>

<section class="overflow-hidden rounded-md bg-white shadow">
	{#if count}
		<!-- Section Heading -->
		<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3 class="text-lg font-medium leading-6 text-gray-900">
						{entity.pluralCap}
					</h3>
				</div>

				{#if !hideActions}
					<div class="ml-4 mt-2 flex-shrink-0">
						<a
							href={createHref}
							class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							sveltekit:prefetch
						>
							Create new {entity.singular}
						</a>
					</div>
				{/if}
			</div>
		</div>

		<ul class="divide-y divide-gray-200">
			<slot />
		</ul>
	{:else}
		<EmptyState {entity} {createHref} />
	{/if}
</section>

<style>
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
