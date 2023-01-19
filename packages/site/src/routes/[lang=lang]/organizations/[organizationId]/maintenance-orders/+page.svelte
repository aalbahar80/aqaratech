<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { MaintenanceOrderDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import MaintenanceOrderTable from '$lib/components/maintenance-order/MaintenanceOrderTable.svelte';

	export let data: PageData;

	const columnHelper = createColumnHelper<MaintenanceOrderDto>();
</script>

<MaintenanceOrderTable
	data={data.maintenanceOrders}
	extraColumns={[
		columnHelper.accessor('breadcrumbs.portfolio.label', {
			id: 'portfolio.fullName', // used for sorting
			header: $L.entity.portfolio.singular(),
		}),
	]}
/>
