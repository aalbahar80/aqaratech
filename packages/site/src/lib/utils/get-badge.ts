import { get } from 'svelte/store';

import L from '$i18n/i18n-svelte';

import type { MAINTENANCEORDERSTATUSENUM } from '$api/openapi';

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
			label: LL.badge.overdue(),
			color: 'red',
		};
	} else if (post < new Date()) {
		return {
			label: LL.badge.due(),
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

export const getMaintenanceOrderBadge = (
	status: MAINTENANCEORDERSTATUSENUM,
) => {
	const LL = get(L);

	switch (status) {
		case 'PENDING':
			return {
				label: LL.badge.inProgress(),
				color: 'indigo',
			};
		case 'COMPLETED':
			return {
				label: LL.badge.completed(),
				color: 'green',
			};
		case 'CANCELLED':
			return {
				label: LL.badge.cancelled(),
				color: 'red',
			};
		default:
			return {
				label: '',
				color: '',
			};
	}
};
