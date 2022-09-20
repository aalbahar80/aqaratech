<script lang="ts">
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { PaginatedExpenseDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';

	export let expenses: PaginatedExpenseDto;

	$: tabular = expenses.results.map((i) => {
		const property = {
			label: i.breadcrumbs?.property?.label ?? 'General',
			href: i.propertyId
				? `/${entitiesMap.property.urlName}/${i.propertyId}`
				: `/portfolios/${i.portfolioId}`,
		};
		const unit = {
			label: property.label ? i.breadcrumbs?.unit?.label : '',
			href: property.label ? `/${entitiesMap.unit.urlName}/${i.unitId}` : '',
			extraStyles: i.breadcrumbs?.unit ? [''] : ['invisible'],
		};
		return {
			id: { label: i.id, hide: true },
			postAt: { label: toUTCFormat(i.postAt) },
			amount: {
				label: kwdFormat(i.amount),
				extraStyles: ['tabular-nums', 'slashed-zero'],
			},
			type: { label: i.expenseType?.labelEn },
			property,
			unit,
			view: {
				label: 'View',
				href: `/expenses/${i.id}`,
			},
		};
	});

	const headers: TableHeader[] = [
		{ key: 'postAt', label: 'Date' },
		{ key: 'type', label: 'Category', style: 'bold1' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'unit', label: 'Unit', isHref: true, style: 'regular' },
		{ key: 'property', label: 'Property', style: 'regular' },
		{ key: 'view', label: 'View', isHref: true, hide: true },
	];

	$: footer = {
		amount: kwdFormat(expenses.results.reduce((acc, i) => acc + i.amount, 0)),
	};

	$: table = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
</script>

<CondensedTable {table}>
	<!-- <div slot="pagination">
		<AnchorPagination
			pagination={expenses.pagination}
			key={EXPENSE_PAGINATION_KEY}
		/>
	</div> -->
</CondensedTable>
