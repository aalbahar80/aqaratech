import { get } from 'svelte/store';
import { getLabel } from '@self/utils';

import L, { locale } from '$i18n/i18n-svelte';

/** Attempt to get label based on locale, falling back to English. */
export const getIntlLabel = (key: string) => {
	const currentLocale = get(locale);

	const enLabel = getLabel(key);

	if (currentLocale === 'ar') {
		const LL = get(L);

		// @ts-expect-error wip
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (LL.fields[key]() as string) || enLabel;
	} else {
		return enLabel;
	}
};
