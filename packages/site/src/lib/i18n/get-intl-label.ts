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

const NON_FORM_LABELS: Record<string, { en: string; ar: string }> = {
	isPaid: {
		en: 'Payment Status',
		ar: 'حالة السداد',
	},
	mfPaymentId: {
		en: 'Payment ID',
		ar: 'رقم الوصل',
	},
};

/** Attempt to get label based on locale, falling back to English.
 * @param key The key to use to get the label.
 * @param form Whether or not the label is for a form. If false,
 * the label will be pulled from NON_FORM_LABELS.
 */
export const getIntlLabel = (key: string, form = true) => {
	const currentLocale = get(locale);

	if (!form) {
		// short-circuit if not a form and override is declared
		const label = NON_FORM_LABELS[key]?.[currentLocale];
		if (label) {
			return label;
		}
	}

	const enLabel = getLabel(key);

	if (currentLocale === 'ar') {
		const LL = get(L);

		// @ts-expect-error wip
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		let arLabel = LL.fields[synonyms[key] ?? key]() as string;
		// @ts-expect-error type hack
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		arLabel ||= LL.entity[key]?.singular() as string;
		arLabel ||= enLabel;
		return arLabel;
	} else {
		return enLabel;
	}
};
