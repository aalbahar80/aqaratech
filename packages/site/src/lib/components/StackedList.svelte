<script lang="ts">
	import { session } from '$app/stores';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { entitiesMap, type Entity } from '@self/utils';

	export let count: number;
	export let formUrl: string;
	// TODO make type either nameMap or EntityTitle
	export let entity: Entity | undefined = undefined;
	export let entityMap = entity ? entitiesMap[entity] : undefined;

	export let hideActions = $session.user?.role?.roleType !== 'ORGADMIN';
</script>

<section class="rounded-md bg-white shadow">
	{#if count}
		<!-- Section Heading -->
		<div
			class="rounded-t-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
		>
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3 class="text-lg font-medium leading-6 text-gray-900">
						{entityMap?.pluralCap}
					</h3>
				</div>

				{#if !hideActions}
					<div class="ml-4 mt-2 flex-shrink-0">
						<slot name="actions">
							<a
								href={formUrl}
								class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Create new {entityMap?.singular}
							</a>
						</slot>
					</div>
				{/if}
			</div>
		</div>

		<ul class="divide-y divide-gray-200">
			<slot />
		</ul>
	{:else}
		<slot name="emptyState">
			<EmptyState {entityMap} {formUrl} />
		</slot>
	{/if}
</section>

<style>
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
