<script lang="ts">
	import type { LayoutData } from './$types';

	import MaintenanceOrderPage from '$lib/components/maintenance-order/MaintenanceOrderPage.svelte';
	import MaintenanceOrderTabs from '$lib/components/maintenance-order/MaintenanceOrderTabs.svelte';

	export let data: LayoutData;
</script>

<MaintenanceOrderPage maintenanceOrder={data.maintenanceOrder} />

<MaintenanceOrderTabs />

<slot />
