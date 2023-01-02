<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';

	import type { LeaseDto } from '$api/openapi';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<LeaseTable
	data={data.leases}
	extraColumns={[
		columnHelper.accessor('portfolioId', {
			header: $LL.entity.portfolio.singular(),
			cell: (info) => info.row.original.breadcrumbs.portfolio.label,
		}),
	]}
/>
