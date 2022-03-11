<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import UnitsList from '$lib/components/UnitsList.svelte';
	import { label } from '$lib/definitions/property';
	import { dateFormat } from '$lib/utils/common';
	import { Trash } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const property = await trpc.query('properties:read', params.id);
		return { props: { property } };
	};
</script>

<script lang="ts">
	type Property = InferQueryOutput<'properties:read'>;
	export let property: Property;

	let details: [string, string | null][];
	$: details = [
		['Address', label(property)],
		['Created on', dateFormat(property.createdAt)],
		['Last updated', property.updatedAt.toLocaleString()],
	];

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="flex items-center justify-between">
		<ModalDelete bind:isOpen id={property.id} entity="properties" />
		<div class="min-w-0 flex-1">
			<BreadCrumb crumbs={[['clients', property.clientId]]} />
			<div class="mt-2 flex items-center space-x-8">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
				>
					Property
				</h2>
			</div>
		</div>
		<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/properties/${property.id}/edit`,
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
	<UnitsList units={property.units} propertyId={property.id} />
</div>
