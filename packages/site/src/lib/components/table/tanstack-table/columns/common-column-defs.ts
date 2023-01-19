import { renderComponent, type ColumnHelper } from '@tanstack/svelte-table';

import { get } from 'svelte/store';
import { getRoute, PageType } from '@self/utils';
import type { Entity } from '@self/utils';

import type { BreadcrumbsDto } from '$api/openapi';

import L from '$i18n/i18n-svelte';
import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';

export const locationColumnDef = <T extends Breadcrumbs>(
	columnHelper: ColumnHelper<T>,
	/* Keys to use for sorting */
	options: { propertyColumnId: string; unitColumnId: string },
) => {
	const LL = get(L);

	return columnHelper.group({
		header: LL.landing.location(),
		columns: [
			columnHelper.accessor((a) => a.breadcrumbs.property, {
				id: options.propertyColumnId,
				header: LL.entity.property.singular(),
				cell: (info) =>
					info.getValue<T['breadcrumbs']['property']>()?.label ?? '',
			}),

			columnHelper.accessor((a) => a.breadcrumbs.unit, {
				id: options.unitColumnId,
				header: LL.entity.unit.singular(),
				cell: (info) => info.getValue<T['breadcrumbs']['unit']>()?.label ?? '',
			}),
		],
	});
};

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
) => {
	const LL = get(L);

	return columnHelper.display({
		id: 'view',
		header: LL.buttons.view(),
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
				value: get(L).buttons.view(),
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
};
