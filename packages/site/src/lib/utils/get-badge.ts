import { get } from 'svelte/store';
import {
	MAINTENANCE_ORDER_STATUS,
	type MaintenanceOrderStatus,
} from '@self/utils';

import type { LeaseDto } from '$api/openapi';

import L from '$i18n/i18n-svelte';
import { getMaintenanceOrderLabels } from '$lib/constants/maintenance-status-options';

export const getInvoiceBadge = (trx: {
	isPaid: boolean;
	dueAt?: string | null | undefined;
	postAt: string;
}) => {
	const LL = get(L);

	if (trx.isPaid) {
		return {
			label: LL.badge.paid(),
			color: 'green',
		};
	} else {
		return {
			label: LL.badge.unpaid(),
			color: 'red',
		};
	}
};

export const getLeaseBadge = (lease: LeaseDto) => {
	const LL = get(L);

	if (lease.computed.phase === 'COMPLETE') {
		return {
			label: LL.badge.expired(),
			color: 'red',
		};
	}
	if (lease.computed.phase === 'FUTURE') {
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
