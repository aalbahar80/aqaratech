<script lang="ts">
	import MaintenanceOrderPage from '$lib/components/maintenance-order/MaintenanceOrderPage.svelte';
	import MaintenanceOrderTabs from '$lib/components/maintenance-order/MaintenanceOrderTabs.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<MaintenanceOrderPage maintenanceOrder={data.maintenanceOrder} />

<MaintenanceOrderTabs />

<slot />
