import { get } from 'svelte/store';

import { PageType, PageTab } from '@self/utils';

import L from '$i18n/i18n-svelte';

export const getTabLabels = () => {
	const LL = get(L);

	return {
		[PageType.Id]: LL.nav.info(),
		[PageTab.Occupancy]: LL.nav.occupancy(),
		[PageTab.Properties]: LL.entity.property.plural(),
		[PageTab.Balance]: LL.general.balance(),
		[PageTab.Roles]: LL.entity.user.plural(),
		[PageTab.Invoices]: LL.entity.leaseInvoice.plural(),
		[PageTab.Maintenance]: LL.entity.maintenanceOrder.plural(),
		[PageTab.Files]: LL.entity.file.plural(),
		[PageTab.Units]: LL.entity.unit.plural(),
		[PageTab.Leases]: LL.entity.lease.plural(),
	};
};
