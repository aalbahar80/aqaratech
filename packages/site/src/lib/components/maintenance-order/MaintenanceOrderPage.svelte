<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';

	import type { MaintenanceOrderDto } from '$api/openapi';

	export let maintenanceOrder: MaintenanceOrderDto;
</script>

<Heading
	title="MaintenanceOrder"
	id={maintenanceOrder.id}
	entity="maintenanceOrder"
	onDelete={async (api) => {
		await api.maintenanceOrders.remove({ id: maintenanceOrder.id });

		const url = '/concierge';

		return url;
	}}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={maintenanceOrder.breadcrumbs} />
	</svelte:fragment>
</Heading>
