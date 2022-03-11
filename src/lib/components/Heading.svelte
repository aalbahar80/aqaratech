<script lang="ts">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import type { Entity } from '$lib/definitions';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import { Trash } from '@steeze-ui/heroicons';
	import Fa from 'svelte-fa';

	type IconTooltip = {
		label: string | number | null | undefined;
		icon: IconDefinition;
		tooltip: string;
	};

	export let title: string;
	export let id: string;
	export let entity: Entity;
	export let icons: IconTooltip[] | undefined = undefined;

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="grid grid-cols-2 items-center justify-between gap-y-4">
	<!-- Breadcrumbs -->
	{#if $$slots.breadcrumbs}
		<div class="col-span-full">
			<slot name="breadcrumbs" />
		</div>
	{/if}

	<!-- Title -->
	<div class="flex items-center">
		<ModalDelete bind:isOpen {id} {entity} />
		<h2
			class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
		>
			{title}
		</h2>
	</div>

	<!-- Edit/Delete button -->
	<div class="flex justify-end">
		<ButtonDropdown
			defaultOption={{
				label: 'Edit',
				href: `/${entity}/${id}/edit`,
			}}
			options={[
				{
					label: 'Delete',
					icon: Trash,
					onClick: openModal,
				},
			]}
		/>
	</div>

	<!-- Icons -->
	{#if icons}
		<div
			class="col-span-full mt-0 flex flex-row flex-wrap space-x-6 sm:col-span-1"
		>
			{#each icons as { label, icon, tooltip } (tooltip)}
				{#if label}
					<div class="mt-2 flex items-center text-sm text-gray-500">
						<Fa {icon} class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
						{label}
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Badge -->
	<!-- TODO don't hardcode, color?, margin -->
	{#if $$slots.badge}
		<div
			class="order-last col-span-full inline-flex items-center rounded-md px-2.5 py-0.5 text-lg font-medium sm:order-none sm:col-span-1 sm:w-1/2"
			class:paid={true}
			class:not-paid={false}
		>
			<slot name="badge" />
		</div>
	{/if}

	<!-- Actions -->
	{#if $$slots.actions}
		<div
			class="col-span-full col-start-1 flex flex-col justify-between space-y-4 sm:col-start-auto sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0"
		>
			<slot name="actions" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.paid {
		@apply bg-green-100 text-green-800;
	}
	.not-paid {
		@apply bg-pink-100 text-pink-800;
	}
</style>
