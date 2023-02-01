import { get } from 'svelte/store';
import { fmt } from '@self/utils';

import { locale } from '$i18n/i18n-svelte';

type CellDataType =
	| {
			format: 'date';
			value: Date | string | null;
	  }
	| {
			format: 'currency' | 'number';
			value: number | null;
	  };

interface Info<T> {
	getValue: () => T;
}

export const fmtCell =
	<T extends CellDataType>(type: T['format']) =>
	(info: Info<T['value']>) => {
		const CL = get(locale);

		const value = info.getValue();
		// @ts-expect-error type limitation
		return value ? fmt({ type, value, locale: CL }) : '';
	};
