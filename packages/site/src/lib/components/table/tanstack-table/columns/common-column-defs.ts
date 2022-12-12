import { renderComponent, type ColumnHelper } from '@tanstack/svelte-table';

import { getRoute, PageType } from '@self/utils';
import type { Entity } from '@self/utils';

import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';

import type { BreadcrumbsDto } from '$api/openapi';

export const locationColumnDef = <T extends Breadcrumbs>(
	columnHelper: ColumnHelper<T>,
) =>
	columnHelper.group({
		header: 'Location',
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

export const viewColumnDef = <
	T extends
		| { id: string; organizationId: string }
		| { id: string; portfolioId: string; organizationId: string },
>(
	columnHelper: ColumnHelper<T>,
	entity: Entity,
	params: Record<string, string>,
) =>
	columnHelper.display({
		id: 'view',
		header: '',
		cell: (props) => {
			// for portal/tenant page, grab the organizationId from the row
			const paramsWithOrgId =
				'organizationId' in props.row.original
					? {
							...params,
							organizationId: props.row.original.organizationId,
					  }
					: params;

			return renderComponent(ActionCell, {
				value: 'View',
				href: getRoute({
					entity,
					id: props.row.original.id,
					pageType: PageType.Id,
					// Add portfolioId to params from table row. Required for organizations/leases page.
					params:
						'portfolioId' in props.row.original
							? {
									portfolioId: props.row.original.portfolioId,
									...paramsWithOrgId,
							  }
							: paramsWithOrgId,
				}),
			});
		},
	});
