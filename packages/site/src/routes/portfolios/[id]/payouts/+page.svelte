<script lang="ts">
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';

	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { PayoutDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns: ColumnDef<PayoutDto>[] = [
		{
			header: 'Post Date',
			footer: 'Post Date',
			id: 'postAt',
			accessorFn: (row) => toUTCFormat(row.postAt),
		},
		{
			header: 'Amount (KWD)',
			footer: 'Amount (KWD)',
			accessorKey: 'amount',
			cell: (info) => {
				return info.getValue<PayoutDto['amount']>().toLocaleString();
			},
		},
		{
			header: '',
			footer: '',
			id: 'view',
			accessorFn: (row) => `/${entitiesMap.payout.urlName}/${row.id}`,
			cell: (info) => info.getValue(),
		},
	];
</script>

<Table
	{columns}
	items={data.payouts.results}
	itemCount={data.payouts.pagination.itemCount}
	pageCount={data.payouts.pagination.pageCount}
	pagination={{
		pageIndex: data.payouts.pagination.page - 1,
		pageSize: data.payouts.pagination.take,
	}}
>
	<div slot="header-actions">
		<a href={`${$page.url.pathname}/csv`} download="payouts.csv">
			<ExportButton />
		</a>
	</div>
</Table>
