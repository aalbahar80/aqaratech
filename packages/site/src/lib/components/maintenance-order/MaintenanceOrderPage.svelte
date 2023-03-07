<script lang="ts">
	import type { MaintenanceOrderDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { getMaintenanceOrderBadge } from '$lib/utils/get-badge';

	export let maintenanceOrder: MaintenanceOrderDto;

	$: badge = getMaintenanceOrderBadge(maintenanceOrder.status);
</script>

<Heading
	title={$L.entity.maintenanceOrder.singular()}
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

<Badge
	label={badge.label}
	badgeColor={badge.color}
/>
