<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { getRoute, PageType } from '@self/utils';

	import type { LeaseDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';
	import GenericActionCell from '$lib/components/table/tanstack-table/GenericActionCell.svelte';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<h3>{$L.misc.tenantLeasePage()}</h3>

<LeaseTable
	data={data.leases}
	extraColumns={[
		columnHelper.display({
			id: 'pay',
			header: '',
			cell: (props) => {
				const lease = props.row.original;

				return renderComponent(GenericActionCell, {
					options: {
						element: 'a',
						label: `${$L.buttons.new()} ${$L.entity.maintenanceOrder.singular()}`,
						href: getRoute({
							entity: 'maintenanceOrder',
							pageType: PageType.New,
							params: {
								organizationId: lease.organizationId,
								portfolioId: lease.portfolioId,
							},
							predefined: {
								unitId: lease.unitId,
								tenantId: $page.data.user?.role?.tenantId ?? '', // HACK: type limitation
							},
						}),
					},
				});
			},
		}),
	]}
/>
