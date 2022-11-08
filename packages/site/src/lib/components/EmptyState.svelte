<script lang="ts">
	import { page } from '$app/stores';
	import FormButtonNew from '$lib/components/form/FormButtonNew.svelte';
	import type { Entity } from '@self/utils';
	import { FolderAdd } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ComponentProps } from 'svelte';

	const hideActions = $page.data.user?.role?.roleType !== 'ORGADMIN';
	export let entity: Entity;
	export let message = 'New';

	export let formButtonProps: ComponentProps<FormButtonNew> | undefined =
		undefined;
</script>

<div class="py-8 text-center sm:py-16">
	<Icon
		src={FolderAdd}
		class="mx-auto h-12 w-12 text-gray-400"
		aria-hidden="true"
	/>
	<h3 class="mt-2 text-sm font-medium text-gray-900">
		<!-- No {entityMap?.plural} -->
	</h3>
	{#if hideActions}
		<p class="mt-1 text-sm text-gray-500">Nothing here, yet.</p>
	{:else}
		<p class="mt-1 text-sm text-gray-500">
			{message}
		</p>
		<slot>
			<div class="mt-6">
				<slot name="formButton">
					<FormButtonNew {entity} {...formButtonProps} />
				</slot>
			</div>
		</slot>
	{/if}
</div>
