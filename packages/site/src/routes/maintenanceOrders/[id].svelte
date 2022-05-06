<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Client, Property, Unit } from '$lib/models/classes';
	import { dateFormat } from '$lib/utils/common';
	import type { Load } from './[id]';

	export const load: Load = async ({ params, fetch }) => {
		const maintenanceOrder = await trpc(fetch).query(
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
			maintenanceOrder.client ? Client.getLabel(maintenanceOrder.client) : '-',
		],
		[
			'Property',
			maintenanceOrder.property
				? Property.getLabel(maintenanceOrder.property)
				: '-',
		],
		[
			'Unit',
			maintenanceOrder.unit ? Unit.getLabel(maintenanceOrder.unit) : '-',
		],
		['Completed At', maintenanceOrder.completedAt?.toLocaleString() ?? '-'],
		['Created on', dateFormat(maintenanceOrder.createdAt)],
		['Last updated', maintenanceOrder.updatedAt.toLocaleString()],
	];
</script>

<Heading
	title="Maintenance Order"
	id={maintenanceOrder.id}
	entity="maintenanceOrders"
/>
<DetailsPane {details} />
