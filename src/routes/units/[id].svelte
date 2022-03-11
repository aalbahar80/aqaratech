<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeasesCard from '$lib/components/tenant/LeasesCard.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import {
		faBath,
		faBed,
		faElevator,
		faMaximize,
		type IconDefinition,
	} from '@fortawesome/free-solid-svg-icons';
	import { Trash } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';
	import Fa from 'svelte-fa';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const unit = await trpc.query('units:read', params.id);
		return { props: { unit } };
	};
</script>

<script lang="ts">
	type Unit = InferQueryOutput<'units:read'>;
	export let unit: Unit;

	let details: [string, string | null][];
	$: details = [
		['Unit Number', unit.unitNumber],
		['Type', unit.type],
		['Market Rent', kwdFormat(unit.marketRent)],
		['Created on', dateFormat(unit.createdAt)],
		['Last updated', unit.updatedAt.toLocaleString()],
	];

	type IconTooltip = {
		label: string | number | null | undefined;
		icon: IconDefinition;
		tooltip: string;
	};
	const icons: IconTooltip[] = [
		{
			label: unit.bed,
			icon: faBed,
			tooltip: 'Bedrooms',
		},
		{
			label: unit.bath,
			icon: faBath,
			tooltip: 'Bathrooms',
		},
		{
			label: `${unit.size?.toLocaleString()} m²`,
			icon: faMaximize,
			tooltip: 'Size',
		},
		{
			label: unit.floor,
			icon: faElevator,
			tooltip: 'Elevator',
		},
	];

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="lg:flex lg:items-center lg:justify-between">
		<ModalDelete bind:isOpen id={unit.id} entity="units" />
		<div class="min-w-0 flex-1">
			<BreadCrumb
				crumbs={[
					['clients', unit.property.clientId],
					['properties', unit.propertyId],
				]}
			/>
			<div class="mt-2 flex items-center space-x-8">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
				>
					Unit
				</h2>
			</div>
			<div
				class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
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
		</div>
		<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/units/${unit.id}/edit`,
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
	</div>
	<DetailsPane {details} />
	<LeasesCard leases={unit.leases} unitId={unit.id} />
</div>
