<script lang="ts">
	import type { LeaseDto } from '$api/openapi';
	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';
	import { createColumnHelper } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<LeaseTable
	data={data.leases}
	extraColumns={[
		columnHelper.accessor('portfolioId', {
			header: 'Portfolio',
			cell: (info) => info.row.original.breadcrumbs.portfolio.label,
		}),
	]}
/>
