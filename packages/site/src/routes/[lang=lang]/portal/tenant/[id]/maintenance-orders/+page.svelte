<script lang="ts">
	import type { PageData } from './$types';

	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	export let data: PageData;
</script>

<MaintenanceOrderTable data={data.maintenanceOrders} />
