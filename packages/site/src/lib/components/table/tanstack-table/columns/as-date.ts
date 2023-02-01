import { get } from 'svelte/store';
import { fmt } from '@self/utils';

import type { CellContext } from '@tanstack/svelte-table';

import { locale } from '$i18n/i18n-svelte';

type CellDateType = 'currency' | 'date' | 'number';

export const fmtCell =
	(type: CellDateType) => (info: CellContext<unknown, unknown | undefined>) => {
		const CL = get(locale);

		const value = info.getValue();
		return value ? fmt({ type, value, locale: CL }) : '';
	};
