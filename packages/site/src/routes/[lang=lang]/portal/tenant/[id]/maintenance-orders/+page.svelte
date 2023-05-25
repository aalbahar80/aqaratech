<script lang="ts">
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	export let data: PageData;
</script>

<MaintenanceOrderTable
	data={data.maintenanceOrders}
	subtitle={$L.misc.tenantMaintenancePage()}
/>
