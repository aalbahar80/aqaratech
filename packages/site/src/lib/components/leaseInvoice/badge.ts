import { get } from 'svelte/store';

import L from '$i18n/i18n-svelte';

export const getUnpaidBadge = (trx: {
	isPaid: boolean;
	dueAt?: string | null | undefined;
	postAt: string;
}) => {
	const LL = get(L);

	const due = trx.dueAt && new Date(trx.dueAt);
	const post = new Date(trx.postAt);
	if (due && due < new Date()) {
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
