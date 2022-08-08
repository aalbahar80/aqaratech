<script lang="ts">
	import { session } from '$app/stores';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import type { MenuOption } from '$lib/models/interfaces/option.interface';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { Trash } from '@steeze-ui/heroicons';

	type IconTooltip = {
		label: string | number | null | undefined;
		icon: any;
		tooltip: string;
	};

	export let title: string;
	export let id: string;
	export let entity: EntityTitle;
	export let icons: IconTooltip[] | undefined = undefined;
	export let extraMenuItems: MenuOption[] = [];
	export let onDelete: (() => void) | undefined = undefined;

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
		<h2
			class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
		>
			{title}
		</h2>
	</div>

	{#if $session.user?.role.roleType === 'ORGADMIN'}
		<!-- Edit/Delete button -->
		<div class="flex justify-end">
			<ModalDelete bind:isOpen {id} {entity} {onDelete} />
			<Dropdown>
				<div slot="beforeButton">
					<a
						href={`/${entityNameMap[entity].urlName}/${id}/edit`}
						class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					>
						Edit
					</a>
				</div>
				<div slot="button">
					<!-- Rename to HybridButtonChevron  -->
					<HybridButton />
				</div>
				<div slot="menu">
					<DropdownMenu
						options={[
							...extraMenuItems,
							{
								label: 'Delete',
								icon: Trash,
								onClick: openModal,
							},
						]}
					/>
				</div>
			</Dropdown>
		</div>
	{:else}
		<!-- hack to keep flex children position consistent -->
		<div />
	{/if}

	<!-- Icons -->
	{#if icons}
		<div
			class="col-span-full mt-0 flex flex-row flex-wrap space-x-6 sm:col-span-1"
		>
			{#each icons as { label, icon, tooltip } (tooltip)}
				{#if label != undefined && icon}
					<div class="mt-2 flex items-center text-sm text-gray-500">
						<svelte:component
							this={icon}
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						/>
						{label}
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Actions -->
	{#if $$slots.actions && $session.user?.role.roleType === 'ORGADMIN'}
		<div
			class="col-span-full col-start-1 flex flex-col justify-between gap-y-4 sm:col-start-auto sm:flex-row sm:justify-end sm:gap-x-4 sm:gap-y-0"
		>
			<slot name="actions" />
		</div>
	{/if}
</div>
