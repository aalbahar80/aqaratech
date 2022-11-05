import type { BreadcrumbsDto } from '$api/openapi';
import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';
import type { Entity } from '@self/utils';
import { getRoute, PageType } from '@self/utils';
import { renderComponent, type ColumnHelper } from '@tanstack/svelte-table';

export const locationColumnDef = <T extends Breadcrumbs>(
	columnHelper: ColumnHelper<T>,
) =>
	columnHelper.group({
		header: 'Location',
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor((a) => a.breadcrumbs.property, {
				id: 'property',
				header: 'Property',
				cell: (info) =>
					info.getValue<T['breadcrumbs']['property']>()?.label ?? '',
				enableSorting: false,
			}),

			columnHelper.accessor((a) => a.breadcrumbs.unit, {
				id: 'unit',
				header: 'Unit',
				cell: (info) => info.getValue<T['breadcrumbs']['unit']>()?.label ?? '',
				enableSorting: false,
			}),
		],
	});

interface Breadcrumbs {
	breadcrumbs: Partial<Pick<BreadcrumbsDto, 'property' | 'unit'>>;
}

export const viewColumnDef = <T extends { id: string }>(
	columnHelper: ColumnHelper<T>,
	entity: Entity,
	params: Record<string, string>,
) =>
	columnHelper.display({
		id: 'view',
		header: '',
		cell: (props) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return renderComponent(ActionCell, {
				value: 'View',
				href: getRoute({
					entity,
					id: props.row.original.id,
					pageType: PageType.Id,
					params,
				}),
			});
		},
	});
