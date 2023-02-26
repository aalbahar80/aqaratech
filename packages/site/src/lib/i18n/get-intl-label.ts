import { get } from 'svelte/store';
import { getLabel } from '@self/utils';

import L, { locale } from '$i18n/i18n-svelte';

/** For i18n.
 * Key: any string value.
 * Value: the key in the LL object.
 */
const synonyms: Record<string, string> = {
	category: 'categoryId',
};

/** Attempt to get label based on locale, falling back to English. */
export const getIntlLabel = (key: string) => {
	const currentLocale = get(locale);

	const enLabel = getLabel(key);

	if (currentLocale === 'ar') {
		const LL = get(L);

		// @ts-expect-error wip
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (LL.fields[synonyms[key] ?? key]() as string) || enLabel;
	} else {
		return enLabel;
	}
};
