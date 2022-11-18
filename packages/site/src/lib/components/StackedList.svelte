<script lang="ts">
	import { page } from '$app/stores';
	import FormButtonNew from '$lib/components/form/FormButtonNew.svelte';
	import type { Entity } from '@self/utils';
	import type { ComponentProps } from 'svelte';

	export let entity: Entity;
	export let formButtonProps: ComponentProps<FormButtonNew> | undefined =
		undefined;

	export let hideActions = $page.data.user?.role?.roleType !== 'ORGADMIN';
</script>

<section class="rounded-md bg-white shadow">
	<!-- Section Heading -->
	<div
		class="flex flex-col gap-y-8 rounded-t-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
	>
		<div
			class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
		>
			<div class="ml-4 mt-2">
				<h3 class="text-2xl font-medium leading-6 text-gray-900">
					{entity}
				</h3>
			</div>

			{#if !hideActions}
				<div class="ml-4 mt-2 flex-shrink-0">
					<slot name="actions">
						<FormButtonNew {entity} {...formButtonProps} />
					</slot>
				</div>
			{/if}
		</div>
		<slot name="secondary" />
	</div>

	<ul class="divide-y divide-gray-200">
		<slot />
	</ul>
</section>

<style>
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
