<script lang="ts">
	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MaintenanceOrderTable data={data.maintenanceOrders} />
