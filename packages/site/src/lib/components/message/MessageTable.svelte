<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { invalidateAll } from '$app/navigation';
	import {
		FORMATS,
		toBrowserLocale,
	} from '@self/utils/src/entity/form/field/format';

	import type { LeaseInvoiceDto, MessageDto } from '$api/openapi';

	import { createApi } from '$api';
	import { handleApiError } from '$api/handle-api-error';
	import L, { locale } from '$i18n/i18n-svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { addSuccessToast } from '$lib/stores/toast';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';

	export let data: MessageDto[];
	export let invoice: LeaseInvoiceDto;

	const columnHelper = createColumnHelper<MessageDto>();

	const columns = [
		columnHelper.accessor('id', {
			header: getIntlLabel('id'),
			enableSorting: false,
		}),

		columnHelper.accessor('status', {
			header: getIntlLabel('status'),
			enableSorting: false,
		}),

		columnHelper.accessor('receivedAt', {
			header: getIntlLabel('receivedAt'),
			enableSorting: false,
			cell: (props) =>
				new Intl.DateTimeFormat(toBrowserLocale($locale), {
					...FORMATS.datetime,
					timeZoneName: 'shortOffset',
					timeZone: 'UTC', // Explicitly set UTC to avoid flash on ssr
				}).format(new Date(props.getValue())),
		}),

		columnHelper.accessor('recipients', {
			header: getIntlLabel('recipients'),
			enableSorting: false,
			meta: { cls: '[direction:ltr]' },
			cell: (props) => props.getValue().join(', '),
		}),
	];
</script>

<Table
	items={data}
	paginationDto={{
		start: 0,
		end: data.length,
		take: 100,
		pageSize: data.length,
		pageCount: 1,
		itemCount: data.length,
		page: 1,
		hasNextPage: false,
		hasPreviousPage: false,
	}}
	{columns}
	columnVisibility={{
		id: false,
	}}
>
	<div
		slot="filter"
		let:filters
	>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<RoleGuard roles={['ORGADMIN']}>
					<button
						class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
						on:click={async () => {
							try {
								await createApi().organizations.sendInvoiceEmail({
									id: invoice.id,
									organizationId: invoice.organizationId,
								});

								addSuccessToast();
								await invalidateAll();
							} catch (e) {
								await handleApiError(e);
							}
						}}
					>
						<span aria-hidden="true"> + </span>
						{$L.buttons.sendReminder()}
					</button>
				</RoleGuard>
			</div>
		</FilterBar>
	</div>
</Table>
