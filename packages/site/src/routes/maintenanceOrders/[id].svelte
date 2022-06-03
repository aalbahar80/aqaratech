<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { dateFormat } from '$lib/utils/common';
	import type { Load } from './__types/[id]';

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
		[
			'Completed At',
			maintenanceOrder.completedAt
				? dateFormat(maintenanceOrder.completedAt)
				: null,
		],
		['Description', maintenanceOrder.description ?? '-'],
	];
</script>

<Heading
	title="Maintenance Order"
	id={maintenanceOrder.id}
	entity="maintenanceOrders"
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={{
				client: maintenanceOrder.client?.id,
				property: maintenanceOrder.property?.id,
				unit: maintenanceOrder.unit?.id,
			}}
		/>
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
