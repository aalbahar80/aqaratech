import type { CellContext } from '@tanstack/svelte-table';

import { fmtCurrency, fmtDate, fmtNumber } from '$lib/i18n/format';

type CellDateType = 'currency' | 'date' | 'number';

const formatters = {
	currency: fmtCurrency,
	date: fmtDate,
	number: fmtNumber,
};

export const fmtCell =
	(type: CellDateType) => (info: CellContext<unknown, unknown | undefined>) => {
		const val = info.getValue();
		return val ? formatters[type](val) : '';
	};
