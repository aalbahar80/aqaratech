import type { MAINTENANCEORDERSTATUSENUM } from '$api/openapi';

export const getInvoiceBadge = (trx: {
	isPaid: boolean;
	dueAt?: string | null | undefined;
	postAt: string;
}) => {
	const due = trx.dueAt && new Date(trx.dueAt);
	const post = new Date(trx.postAt);
	if (trx.isPaid) {
		return {
			label: 'Paid',
			color: 'green',
		};
	} else if (due && due < new Date()) {
		return {
			label: 'Past due',
			color: 'red',
		};
	} else if (post < new Date()) {
		return {
			label: 'Due',
			color: 'yellow',
		};
	} else {
		return {
			label: 'Not yet due',
			color: 'indigo',
		};
	}
};

export const getLeaseBadge = (dates: { start: string; end: string }) => {
	if (new Date(dates.end) < new Date()) {
		return {
			label: 'Expired',
			color: 'red',
		};
	}
	if (new Date(dates.start) > new Date()) {
		return {
			label: 'Upcoming',
			color: 'indigo',
		};
	}
	return {
		label: 'Current',
		color: 'green',
	};
};

export const getMaintenanceOrderBadge = (
	status: MAINTENANCEORDERSTATUSENUM,
) => {
	switch (status) {
		case 'PENDING':
			return {
				label: 'In progress',
				color: 'indigo',
			};
		case 'COMPLETED':
			return {
				label: 'Completed',
				color: 'green',
			};
		case 'CANCELLED':
			return {
				label: 'Cancelled',
				color: 'red',
			};
		default:
			return {
				label: '',
				color: '',
			};
	}
};
