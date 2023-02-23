import { get } from 'svelte/store';
import type { MaintenanceOrderStatus } from '@self/utils';

import L from '$i18n/i18n-svelte';

export const getMaintenanceOrderLabels = () => {
	const LL = get(L);

	return {
		Pending: LL.badge.inProgress(),
		Completed: LL.badge.completed(),
		Cancelled: LL.badge.cancelled(),
	} satisfies Record<MaintenanceOrderStatus, string>;
};

// use empty string to represent null,
// otherwise a string 'null' may be sent to the server
// https://stackoverflow.com/a/62303327/9689661
export const maintenanceStatusOptions = () => {
	const options = Object.entries(getMaintenanceOrderLabels()).map(
		([key, value]) => ({
			label: value,
			value: key,
		}),
	);

	return options;
};
