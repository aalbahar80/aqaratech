<script lang="ts">
	import { page } from '$app/stores';
	import type { EntityNames } from '@self/utils';
	import { FolderAdd, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const hideActions = $page.data.user?.role?.roleType !== 'ORGADMIN';
	export let entityMap: EntityNames | undefined = undefined;
	export let formUrl: string;
	export let message = `Get started by creating a new ${entityMap?.singular}.`;
	export let buttonText = `New ${entityMap?.singular}`;
</script>

<div class="py-8 text-center sm:py-16">
	<Icon
		src={FolderAdd}
		class="mx-auto h-12 w-12 text-gray-400"
		aria-hidden="true"
	/>
	<h3 class="mt-2 text-sm font-medium text-gray-900">
		No {entityMap?.plural}
	</h3>
	{#if hideActions}
		<p class="mt-1 text-sm text-gray-500">Nothing here, yet.</p>
	{:else}
		<p class="mt-1 text-sm text-gray-500">
			{message}
		</p>
		<slot>
			<div class="mt-6">
				<a
					href={formUrl}
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					data-sveltekit-prefetch
				>
					<Icon src={Plus} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
					{buttonText}
				</a>
			</div>
		</slot>
	{/if}
</div>
