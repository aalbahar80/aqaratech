<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { getLabel } from '@self/utils';

	import { view } from '$lib/components/file/actions/view';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
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
			header: getLabel('key'),
			cell: (info) => {
				const val = info.getValue();
				return val.split('/').slice(-1);
			},
		}),

		columnHelper.accessor('size', {
			header: 'Size (kB)',
			cell: (info) => {
				const val = info.getValue();
				return Math.round(val / 1000);
			},
		}),

		...extraColumns,

		// View
		columnHelper.display({
			id: 'view',
			header: '',
			cell: (props) => {
				const file = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: 'View',
						onClick: async () => {
							await view(file);
						},
					},
				});
			},
		}),

		// Delete
		columnHelper.display({
			id: 'delete',
			header: '',
			cell: (props) => {
				const file = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: 'Delete',
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
	{columns}
	columnVisibility={{
		dueAt: false,
		paidAt: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<RoleGuard roles={['ORGADMIN']}>
					<a
						href={getFormRouteWithRelation({
							entity: 'file',
							pathname: $page.url.pathname,
							params: $page.params,
							redirectTo: $page.url.pathname,
						})}
						class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
					>
						<span aria-hidden="true"> + </span>
						New
					</a>
				</RoleGuard>
			</div>
		</FilterBar>
	</div>
</Table>
