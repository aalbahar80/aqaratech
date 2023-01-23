import {
	renderComponent,
	type AccessorFn,
	type ColumnHelper,
} from '@tanstack/svelte-table';

import { page } from '$app/stores';
import { get } from 'svelte/store';
import { getRoute, PageType } from '@self/utils';

import type {
	LeaseDto,
	LeaseInvoiceDto,
	MaintenanceOrderDto,
} from '$api/openapi';

import L from '$i18n/i18n-svelte';
import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';

type Helper =
	| ColumnHelper<LeaseInvoiceDto>
	| ColumnHelper<LeaseDto>
	| ColumnHelper<MaintenanceOrderDto>;

type HelperEntity = LeaseInvoiceDto | LeaseDto | MaintenanceOrderDto;

export const portfolioColumnDef = <
	T extends Helper,
	K extends HelperEntity = T extends ColumnHelper<infer Entity>
		? Entity extends HelperEntity
			? Entity
			: never
		: never,
>(
	helper: T,
) => {
	return (helper.accessor as unknown as ColumnHelper<K>['accessor'])(
		'breadcrumbs.portfolio.label' as unknown as AccessorFn<K>,
		{
			id: 'portfolio.fullName', // used for sorting
			header: get(L).entity.portfolio.singular(),
			cell: (info) => {
				const row = info.row.original;

				return renderComponent(ActionCell, {
					value: row.breadcrumbs.portfolio.label,
					href: getRoute({
						entity: 'portfolio',
						id: row.portfolioId,
						pageType: PageType.Id,
						params: get(page).params,
					}),
				});
			},
		},
	);
};
