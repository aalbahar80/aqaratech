import { get } from 'svelte/store';
import {
	MAINTENANCE_ORDER_STATUS,
	type MaintenanceOrderStatus,
} from '@self/utils';

import L from '$i18n/i18n-svelte';
import { getMaintenanceOrderLabels } from '$lib/constants/maintenance-status-options';

export const getInvoiceBadge = (trx: {
	isPaid: boolean;
	dueAt?: string | null | undefined;
	postAt: string;
}) => {
	const LL = get(L);

	const due = trx.dueAt && new Date(trx.dueAt);
	const post = new Date(trx.postAt);
	if (trx.isPaid) {
		return {
			label: LL.badge.paid(),
			color: 'green',
		};
	} else if (due && due < new Date()) {
		return {
			label: `${LL.badge.unpaid()} (${LL.badge.overdue()})`,
			color: 'red',
		};
	} else if (post < new Date()) {
		return {
			label: `${LL.badge.unpaid()} (${LL.badge.due()})`,
			color: 'yellow',
		};
	} else {
		return {
			label: LL.badge.notYetDue(),
			color: 'indigo',
		};
	}
};

export const getLeaseBadge = (dates: { start: string; end: string }) => {
	const LL = get(L);

	if (new Date(dates.end) < new Date()) {
		return {
			label: LL.badge.expired(),
			color: 'red',
		};
	}
	if (new Date(dates.start) > new Date()) {
		return {
			label: LL.badge.upcoming(),
			color: 'indigo',
		};
	}
	return {
		label: LL.badge.current(),
		color: 'green',
	};
};

export const getMaintenanceOrderBadge = (status: MaintenanceOrderStatus) => {
	const labels = getMaintenanceOrderLabels();

	switch (status) {
		case MAINTENANCE_ORDER_STATUS.PENDING:
			return {
				label: labels.Pending,
				color: 'indigo',
			};
		case MAINTENANCE_ORDER_STATUS.COMPLETED:
			return {
				label: labels.Completed,
				color: 'green',
			};
		case MAINTENANCE_ORDER_STATUS.CANCELLED:
			return {
				label: labels.Cancelled,
				color: 'red',
			};
		default:
			return {
				label: '',
				color: '',
			};
	}
};
