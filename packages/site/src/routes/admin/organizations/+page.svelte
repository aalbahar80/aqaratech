<script lang="ts">
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { OrganizationDto } from '$api/openapi';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns: ColumnDef<OrganizationDto>[] = [
		{
			header: 'Created At',
			footer: 'Created At',
			id: 'createdAt',
			accessorFn: (row) => toUTCFormat(row.createdAt),
		},
		{
			header: 'Full Name',
			footer: 'Full Name',
			accessorKey: 'fullName',
		},
		{
			header: 'Label',
			footer: 'Label',
			accessorKey: 'label',
		},
		{
			// TODO derive from stripe
			header: 'Billing Plan',
			footer: 'Billing Plan',
			accessorKey: 'billingPlan',
			accessorFn: () => 'TBD from Stripe',
		},
		{
			// TODO derive from stripe
			header: 'Is Active',
			footer: 'Is Active',
			accessorFn: () => 'TBD from Stripe',
		},
		{
			// TODO add stripe url here
			header: 'Stripe',
			footer: '',
			id: 'view',
			accessorFn: () => 'TBD from Stripe',
		},
	];
</script>

<Table
	{columns}
	items={data.organizations.results}
	itemCount={data.organizations.pagination.itemCount}
	pageCount={data.organizations.pagination.pageCount}
	pagination={{
		pageIndex: data.organizations.pagination.page - 1,
		pageSize: data.organizations.pagination.take,
	}}
/>
