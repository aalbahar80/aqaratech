<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseDto } from '$api/openapi';

	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';
	import { tenantColumnDef } from '$lib/components/table/tanstack-table/columns/portfolio';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<LeaseTable
	data={data.leases}
	extraColumns={[tenantColumnDef(columnHelper)]}
	columnVisibility={{
		property: false,
		unit: false,
	}}
/>
