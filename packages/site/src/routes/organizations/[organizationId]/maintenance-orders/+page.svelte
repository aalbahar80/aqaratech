<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { entity } from '@self/utils';

	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	import type { MaintenanceOrderDto } from '$api/openapi';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<MaintenanceOrderDto>();
</script>

<MaintenanceOrderTable
	data={data.maintenanceOrders}
	extraColumns={[
		columnHelper.accessor('portfolioId', {
			header: entity.portfolio.singularCap,
			cell: (info) => info.row.original.breadcrumbs.portfolio.label,
		}),
	]}
/>
