import { renderComponent, type ColumnHelper } from '@tanstack/svelte-table';

import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { Entity } from '@self/utils';
import { getRoute, PageType } from '@self/utils';

import type {
	ExpenseBreadcrumbsDto,
	LeaseInvoiceBreadcrumbsDto,
	MaintenanceOrderBreadcrumbsDto,
} from '$api/openapi';

import L from '$i18n/i18n-svelte';
import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';

export const locationColumnDef = <
	T extends Breadcrumbs & { portfolioId: string },
>(
	columnHelper: ColumnHelper<T>,
	/* Keys to use for sorting */
	options: { propertyColumnId: string; unitColumnId: string },
) => {
	const LL = get(L);
	const user = get(page).data.user;

	return columnHelper.group({
		id: 'location',
		header: '',
		columns: [
			columnHelper.accessor((a) => a.breadcrumbs.property, {
				id: options.propertyColumnId,
				header: LL.entity.property.singular(),
				cell: (info) => {
					const row = info.row.original;
					const property = row.breadcrumbs.property;

					// Cases where we don't have a property (expenses, maintenance orders)
					if (!property) {
						return '';
					}

					// Avoid rendering a link in tenant portal
					if (user?.role?.roleType === 'TENANT') {
						return property.label;
					}

					return renderComponent(ActionCell, {
						value: property.label,
						href: getRoute({
							entity: 'property',
							id: property.id,
							pageType: PageType.Id,
							params: {
								...get(page).params,
								portfolioId: row.portfolioId,
							},
						}),
					});
				},
			}),

			columnHelper.accessor((a) => a.breadcrumbs.unit, {
				id: options.unitColumnId,
				header: LL.entity.unit.singular(),
				cell: (info) => {
					const row = info.row.original;
					const unit = row.breadcrumbs.unit;

					// Cases where we don't have a unit (expenses, maintenance orders)
					if (!unit) {
						return '';
					}

					// Avoid rendering a link in tenant portal
					if (user?.role?.roleType === 'TENANT') {
						return unit.label;
					}

					return renderComponent(ActionCell, {
						value: unit.label,
						href: getRoute({
							entity: 'unit',
							id: unit.id,
							pageType: PageType.Id,
							params: {
								...get(page).params,
								portfolioId: row.portfolioId,
							},
						}),
					});
				},
			}),
		],
	});
};

interface Breadcrumbs {
	breadcrumbs:
		| ExpenseBreadcrumbsDto
		| LeaseInvoiceBreadcrumbsDto
		| MaintenanceOrderBreadcrumbsDto;
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
