<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import { inferUrlRelation } from '@self/utils';

	import GenericActionCell from '../table/tanstack-table/GenericActionCell.svelte';

	import { remove } from './actions/remove';

	import type { ColumnDto } from '$lib/components/table/column-type';

	import {
		RoleTypeEnum,
		type FileDto,
		type PaginatedFileDto,
	} from '$api/openapi';
	import L from '$i18n/i18n-svelte';
	import AddButton from '$lib/components/buttons/AddButton.svelte';
	import { view } from '$lib/components/file/actions/view';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { getFormRouteWithRelation } from '$lib/utils/file';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';

	export let data: PaginatedFileDto;
	export let extraColumns: ColumnDto<FileDto>[] = [];

	const columnHelper = createColumnHelper<FileDto>();

	const columns = [
		columnHelper.accessor('id', {
			header: getIntlLabel('key'), // use key for the label
			cell: (info) => {
				const val = info.getValue();
				return val.split('/').slice(-1);
			},
		}),

		columnHelper.accessor('size', {
			header: $L.fields.size2(),
			cell: (info) => {
				const val = info.getValue();
				return Math.round(val / 1000);
			},
		}),

		...extraColumns,

		// View
		columnHelper.display({
			id: 'view',
			header: $L.buttons.view(),
			cell: (props) => {
				const file = props.row.original;

				return renderComponent(GenericActionCell, {
					options: {
						element: 'button',
						label: $L.buttons.view(),
						onClick: async () => {
							await view(file, $page.data.user!.role!.organizationId);
						},
					},
				});
			},
		}),
	];

	const adminColumns = [
		// Delete
		columnHelper.display({
			id: 'delete',
			header: $L.buttons.delete(),
			cell: (props) => {
				const file = props.row.original;

				return renderComponent(GenericActionCell, {
					options: {
						element: 'button',
						label: $L.buttons.delete(),
						onClick: () => {
							remove(file, $page.data.user!.role!.organizationId);
						},
					},
				});
			},
		}),
	];

	$: maintenancePage =
		inferUrlRelation($page.url.pathname).entity === 'maintenanceOrder';
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	columns={$page.data.user?.role?.roleType === 'ORGADMIN'
		? [...columns, ...adminColumns]
		: columns}
	columnVisibility={{
		dueAt: false,
		paidAt: false,
	}}
>
	<div
		slot="filter"
		let:filters
	>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<RoleGuard
					roles={[
						RoleTypeEnum.Orgadmin,
						// Tenants can attach files to maintenance orders
						...(maintenancePage ? [RoleTypeEnum.Tenant] : []),
					]}
				>
					<AddButton
						href={getFormRouteWithRelation({
							entity: 'file',
							pathname: $page.url.pathname,
							params: $page.params,
							redirectTo: $page.url.pathname,
						})}
					/>
				</RoleGuard>
			</div>
		</FilterBar>
	</div>
</Table>
