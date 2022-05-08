<script lang="ts">
	import { session } from '$app/stores';
	import { classMap } from '$lib/models/classes/all.class';
	import type { EntityTitle } from '$models/types/entity.type';
	import { FolderAdd, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let entity: EntityTitle;
	export let count: number;

	const hideActions = $session.authz?.role !== 'admin';
	const model = classMap[entity];

	export let createHref = `/new/${model.plural}`;
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
						{model.pluralCap}
					</h3>
				</div>

				{#if !hideActions}
					<div class="ml-4 mt-2 flex-shrink-0">
						<a
							href={createHref}
							class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Create new {model.singular}
						</a>
					</div>
				{/if}
			</div>
		</div>

		<ul class="divide-y divide-gray-200">
			<slot />
		</ul>
	{:else}
		<!-- Empty State -->
		<div class="text-center py-8 sm:py-16">
			<Icon
				src={FolderAdd}
				class="mx-auto h-12 w-12 text-gray-400"
				aria-hidden="true"
			/>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No {model.plural}</h3>
			{#if hideActions}
				<p class="mt-1 text-sm text-gray-500">Nothing here, yet.</p>
			{:else}
				<p class="mt-1 text-sm text-gray-500">
					Get started by creating a new {model.singular}.
				</p>
				<div class="mt-6">
					<a
						href={createHref}
						class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<Icon src={Plus} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
						New {model.singular}
					</a>
				</div>
			{/if}
		</div>
	{/if}
</section>

<style>
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
