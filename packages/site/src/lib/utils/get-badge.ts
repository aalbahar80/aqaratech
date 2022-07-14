export const getInvoiceBadge = (trx: {
	isPaid: boolean;
	dueAt: Date | null;
	postAt: Date;
}) => {
	if (trx.isPaid) {
		return {
			label: 'Paid',
			color: 'green',
		};
	} else if (trx.dueAt && trx.dueAt < new Date()) {
		return {
			label: 'Past due',
			color: 'red',
		};
	} else if (trx.postAt < new Date()) {
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

export const getLeaseBadge = (dates: { start: Date; end: Date }) => {
	if (dates.end < new Date()) {
		return {
			label: 'Expired',
			color: 'red',
		};
	}
	if (dates.start > new Date()) {
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
