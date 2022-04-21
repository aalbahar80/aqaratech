<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { dateFormat } from '$lib/utils/common';
	import type { Load } from './[id]';
	import {
		ClientModel,
		PropertyModel,
		UnitModel,
	} from '$lib/models/interfaces';

	export const load: Load = async ({ params }) => {
		const maintenanceOrder = await trpc.query(
			'maintenanceOrders:read',
			params.id,
		);
		return { props: { maintenanceOrder } };
	};
</script>

<script lang="ts">
	type MaintenanceOrder = InferQueryOutput<'maintenanceOrders:read'>;
	export let maintenanceOrder: MaintenanceOrder;

	let details: [string, string | null][];
	$: details = [
		['Title', maintenanceOrder.title],
		['Status', maintenanceOrder.status ?? '-'],
		['Description', maintenanceOrder.description ?? '-'],
		[
			'Client',
			maintenanceOrder.client
				? ClientModel.getLabel(maintenanceOrder.client)
				: '-',
		],
		[
			'Property',
			maintenanceOrder.property
				? PropertyModel.getLabel(maintenanceOrder.property)
				: '-',
		],
		[
			'Unit',
			maintenanceOrder.unit ? UnitModel.getLabel(maintenanceOrder.unit) : '-',
		],
		['Completed At', maintenanceOrder.completedAt?.toLocaleString() ?? '-'],
		['Created on', dateFormat(maintenanceOrder.createdAt)],
		['Last updated', maintenanceOrder.updatedAt.toLocaleString()],
	];
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading
		title="Maintenance Order"
		id={maintenanceOrder.id}
		entity="maintenanceOrders"
	/>
	<DetailsPane {details} />
</div>
