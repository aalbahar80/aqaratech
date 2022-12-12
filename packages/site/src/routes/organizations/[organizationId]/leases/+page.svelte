<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { entity } from '@self/utils';

	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';

	import type { LeaseDto } from '$api/openapi';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<LeaseTable
	data={data.leases}
	extraColumns={[
		columnHelper.accessor('portfolioId', {
			header: entity.portfolio.singularCap,
			cell: (info) => info.row.original.breadcrumbs.portfolio.label,
		}),
	]}
/>
