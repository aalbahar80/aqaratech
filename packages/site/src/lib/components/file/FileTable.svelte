<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import AddButton from '$lib/components/buttons/AddButton.svelte';
	import { view } from '$lib/components/file/actions/view';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { getFormRouteWithRelation } from '$lib/utils/file';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';

	import { remove } from './actions/remove';

	import type { FileDto, PaginatedFileDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';

	export let data: PaginatedFileDto;
	export let extraColumns: ColumnDto<FileDto>[] = [];

	const columnHelper = createColumnHelper<FileDto>();

	const columns = [
		columnHelper.accessor('key', {
			header: getIntlLabel('key'),
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

				return renderComponent(ActionButton, {
					options: {
						label: $L.buttons.view(),
						onClick: async () => {
							await view(file);
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

				return renderComponent(ActionButton, {
					options: {
						label: $L.buttons.delete(),
						onClick: () => {
							remove(file);
						},
					},
				});
			},
		}),
	];
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
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<RoleGuard roles={['ORGADMIN']}>
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
