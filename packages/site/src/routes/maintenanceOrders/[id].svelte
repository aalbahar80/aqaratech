<!-- <script lang="ts" context="module">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { Load } from './__types/[id]';

	export const load: Load = async ({ params, fetch }) => {
		const maintenanceOrder = await trpc(fetch).query(
			'maintenanceOrders:read',
			params.id,
		);
		return { props: { maintenanceOrder } };
	};
</script> -->

<!-- <script lang="ts">
	export let maintenanceOrder: MaintenanceOrder;

	$: details = [
		['Title', maintenanceOrder.title],
		['Status', maintenanceOrder.status ?? '-'],
		[
			'Completed At',
			maintenanceOrder.completedAt
				? toUTCFormat(maintenanceOrder.completedAt)
				: null,
		],
		['Description', maintenanceOrder.description ?? '-'],
	] as [string, string | null][];
</script> -->

<!-- <Heading
	title="Maintenance Order"
	id={maintenanceOrder.id}
	entity="maintenanceOrders"
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={{
				portfolio: maintenanceOrder.portfolio?.id,
				property: maintenanceOrder.property?.id,
				unit: maintenanceOrder.unit?.id,
			}}
		/>
	</svelte:fragment>
</Heading> -->
<!-- <DetailsPane {details} /> -->
