import { PageType } from './enums/page-type.enum';
import { getBaseRoute } from './get-base-route';
import { getDashboardRoute, isDashboardRoute } from './get-dashboard-route';
import { getFormRoute } from './get-form-route';
import { getIdRoute } from './get-id-route';
import { getListRoute } from './get-list-route';

import type { GetRoute } from './types/route-helpers.type';

export const getRoute = (input: GetRoute) => {
	const base = getBaseRoute(input);

	let destination;

	if (input.pageType === PageType.List) {
		destination = getListRoute(input, base);
	} else if (input.pageType === PageType.New) {
		destination = getFormRoute(input, base);
	} else if (isDashboardRoute(input)) {
		destination = getDashboardRoute(input, base);
	} else {
		destination = getIdRoute(input, base);
	}

	// always add lang to beginning of route
	const defaultLocale = 'en';
	const lang = input.params['lang'] ?? defaultLocale;

	return `/${lang}${destination}`;
};
