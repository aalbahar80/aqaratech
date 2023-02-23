import { get } from 'svelte/store';
import { MAINTENANCE_ORDER_STATUS } from '@self/utils';

import L from '$i18n/i18n-svelte';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// use empty string to represent null,
// otherwise a string 'null' may be sent to the server
// https://stackoverflow.com/a/62303327/9689661
export const maintenanceStatusOptions = MAINTENANCE_ORDER_STATUS.map(
	(status) => {
		const LL = get(L);

		const maintenanceStatusLabels = {
			PENDING: LL.badge.inProgress(),
			COMPLETED: LL.badge.completed(),
			CANCELLED: LL.badge.cancelled(),
			'': '',
		} satisfies Record<
			Writeable<(typeof MAINTENANCE_ORDER_STATUS)[number]>,
			string
		>;

		return {
			label: maintenanceStatusLabels[status],
			value: status,
		};
	},
);
