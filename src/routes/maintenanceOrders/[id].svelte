<script lang="ts" context="module">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { dateFormat } from '$lib/utils/common';
	import { Trash } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const maintenanceOrder = await trpc.query(
			'maintenanceOrders:read',
			params.id,
		);
		return { props: { maintenanceOrder } };
	};
</script>

<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';

	type MaintenanceOrder = InferQueryOutput<'maintenanceOrders:read'>;
	export let maintenanceOrder: MaintenanceOrder;

	let details: [string, string | null][];
	$: details = [
		// [
		// 	'Name',
		// 	concatIfExists([maintenanceOrder.firstName, maintenanceOrder.lastName]),
		// ],
		// ['Phone', maintenanceOrder.phone],
		// ['Email', maintenanceOrder.email],
		['Created on', dateFormat(maintenanceOrder.createdAt)],
		['Last updated', maintenanceOrder.updatedAt.toLocaleString()],
	];

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="flex items-center justify-between">
		<ModalDelete
			bind:isOpen
			id={maintenanceOrder.id}
			entity="maintenanceOrders"
		/>
		<div class="min-w-0 flex-1">
			<div class="mt-2 flex items-center space-x-8">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
				>
					Maintenance Order
				</h2>
			</div>
		</div>
		<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/maintenanceOrders/${maintenanceOrder.id}/edit`,
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
	<!-- <PropertyList
		properties={maintenanceOrder.properties}
		maintenanceOrderId={maintenanceOrder.id}
	/> -->
	<pre>{JSON.stringify(maintenanceOrder, null, 2)}</pre>
</div>
