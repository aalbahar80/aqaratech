<script lang="ts">
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	export let data: PageData;
</script>

<h3>{$L.misc.tenantMaintenancePage()}</h3>

<MaintenanceOrderTable data={data.maintenanceOrders} />
