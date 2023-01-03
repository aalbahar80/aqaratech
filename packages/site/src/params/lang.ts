import { isLocale } from '$i18n/i18n-util';

import type { ParamMatcher } from '@sveltejs/kit';

// only accept valid languages as a segment in the URL
export const match: ParamMatcher = (param) => {
	return isLocale(param);
};
