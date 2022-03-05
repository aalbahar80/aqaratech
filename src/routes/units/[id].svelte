<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { Speakerphone, Trash } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';

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
				<!-- <span
					class="inline-flex h-8 items-center rounded-md px-2.5 py-0.5 text-lg font-medium"
					class:paid={unit.isOccupied}
					class:not-paid={!unit.isOccupied}
				>
					{trx.isPaid ? 'Paid' : 'Not paid'}
				</span> -->
			</div>
		</div>
		<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
			<Button icon={Speakerphone} text="Send Reminder" solid disabled />
			<!-- <Button
				icon={CurrencyDollar}
				text={unit.isOccuppied ? 'Mark as Unpaid' : 'Mark as Paid'}
				solid
				on:click={toggleIsPaid}
				{loading}
			/> -->
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/transactions/${unit.id}/edit`,
					type: 'link',
				}}
				options={[
					{
						label: 'Delete',
						icon: Trash,
						onClick: openModal,
						type: 'button',
					},
				]}
			/>
		</div>
	</div>
	<DetailsPane {details} />
	<pre>{JSON.stringify(unit, null, 2)}</pre>
</div>

<style lang="postcss">
	.paid {
		@apply bg-green-100 text-green-800;
	}
	.not-paid {
		@apply bg-pink-100 text-pink-800;
	}
</style>
