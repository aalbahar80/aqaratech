<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { dateFormat } from '$lib/utils/common';
	import type { Load } from './[id]';

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
		// [
		// 	'Name',
		// 	concatIfExists([maintenanceOrder.firstName, maintenanceOrder.lastName]),
		// ],
		// ['Phone', maintenanceOrder.phone],
		// ['Email', maintenanceOrder.email],
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
	<!-- <PropertyList
		properties={maintenanceOrder.properties}
		maintenanceOrderId={maintenanceOrder.id}
	/> -->
	<pre>{JSON.stringify(maintenanceOrder, null, 2)}</pre>
</div>
