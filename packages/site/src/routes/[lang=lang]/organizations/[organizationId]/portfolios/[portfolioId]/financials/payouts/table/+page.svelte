<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import { toUTCFormat } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';

	import type { PayoutDto } from '$api/openapi';

	export let data: PageData;

	const columnHelper = createColumnHelper<PayoutDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: 'Post Date',
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('amount', {
			header: 'Amount (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		viewColumnDef(columnHelper, 'payout', $page.params),
	];
</script>

<Table
	items={data.payouts.results}
	paginationDto={data.payouts.pagination}
	{columns}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="hero">
				<FilterHero title={$L.entity.payout.plural()} />
			</div>
			<div slot="custom">
				<FilterBarActions>
					<FilterBarActionsExport />
				</FilterBarActions>
			</div>
		</FilterBar>
	</div>
</Table>
