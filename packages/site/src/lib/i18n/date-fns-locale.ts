import ar from 'date-fns/locale/ar/index.js';

import { isRTL } from './locale-labels';

import type { Locales } from '$i18n/i18n-types';

export const dateFnsLocale = (locale: Locales) =>
	isRTL(locale) ? ar : (undefined as unknown as typeof ar);
