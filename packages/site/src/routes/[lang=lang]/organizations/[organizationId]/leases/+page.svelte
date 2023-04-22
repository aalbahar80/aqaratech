<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseDto } from '$api/openapi';

	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';
	import {
		portfolioColumnDef,
		tenantColumnDef,
	} from '$lib/components/table/tanstack-table/columns/portfolio';
	import { leasePhaseFilter } from '$lib/components/table/tanstack-table/filters/lease-phase';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<LeaseTable
	data={data.leases}
	extraColumns={[
		portfolioColumnDef(columnHelper),
		tenantColumnDef(columnHelper),
	]}
	extraFilters={[$leasePhaseFilter]}
/>
