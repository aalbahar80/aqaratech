<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { MaintenanceOrderDto } from '$api/openapi';

	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';
	import { portfolioColumnDef } from '$lib/components/table/tanstack-table/columns/portfolio';

	export let data: PageData;

	const columnHelper = createColumnHelper<MaintenanceOrderDto>();
</script>

<MaintenanceOrderTable
	data={data.maintenanceOrders}
	extraColumns={[portfolioColumnDef(columnHelper)]}
/>
