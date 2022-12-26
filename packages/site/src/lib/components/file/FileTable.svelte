<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { getLabel } from '@self/utils';

	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import type { ColumnDto } from '$lib/components/table/column-type';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { createModalDelete } from '$lib/components/toast/create-modal-delete';
	import { openModal } from '$lib/components/toast/Modal.svelte';
	import { getFormRouteWithRelation } from '$lib/utils/file';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';

	import type { FileDto, PaginatedFileDto } from '$api/openapi';

	import { createApi } from '$api';

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
							// encode file name to avoid special characters
							const url = await createApi().files.findOne({
								key: file.key,
							});

							// opens in new tab because of content-disposition header
							window.open(url);
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
							openModal(
								createModalDelete({
									onDelete: async (api) => {
										await api.files.remove({
											key: file.key,
										});

										await invalidateAll();

										return;
									},
								}),
							);
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
						+ New
					</a>
				</RoleGuard>
			</div>
		</FilterBar>
	</div>
</Table>
