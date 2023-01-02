<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	import type { MaintenanceOrderDto } from '$api/openapi';

	export let data: PageData;

	const columnHelper = createColumnHelper<MaintenanceOrderDto>();
</script>

<MaintenanceOrderTable
	data={data.maintenanceOrders}
	extraColumns={[
		columnHelper.accessor('portfolioId', {
			header: $LL.entity.portfolio.singular(),
			cell: (info) => info.row.original.breadcrumbs.portfolio.label,
		}),
	]}
/>
