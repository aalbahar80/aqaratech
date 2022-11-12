<script lang="ts">
	import type { PayoutDto } from '$api/openapi';
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { createColumnHelper } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<PayoutDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: 'Post Date',
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('amount', {
			header: 'Amount (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		viewColumnDef(columnHelper, 'payout', $page.params),
	];
</script>

<Table
	items={data.payouts.results}
	paginationDto={data.payouts.pagination}
	{columns}
	paginationType="server"
>
	<div slot="header-actions">
		<a href={`${$page.url.pathname}/csv`} download="payouts.csv">
			<ExportButton />
		</a>
	</div>
</Table>
