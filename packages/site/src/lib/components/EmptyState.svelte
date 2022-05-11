<script lang="ts">
	import { session } from '$app/stores';
	import type { EntityConstructor } from '$lib/models/types/entity.type';
	import { FolderAdd, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const hideActions = $session.authz?.role !== 'admin';
	export let entity: EntityConstructor;
	export let createHref: string;
</script>

<div class="py-8 text-center sm:py-16">
	<Icon
		src={FolderAdd}
		class="mx-auto h-12 w-12 text-gray-400"
		aria-hidden="true"
	/>
	<h3 class="mt-2 text-sm font-medium text-gray-900">No {entity.plural}</h3>
	{#if hideActions}
		<p class="mt-1 text-sm text-gray-500">Nothing here, yet.</p>
	{:else}
		<p class="mt-1 text-sm text-gray-500">
			Get started by creating a new {entity.singular}.
		</p>
		<div class="mt-6">
			<a
				href={createHref}
				class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				sveltekit:prefetch
			>
				<Icon src={Plus} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				New {entity.singular}
			</a>
		</div>
	{/if}
</div>
