import { PageType } from './enums/page-type.enum';
import { getBaseRoute } from './get-base-route';
import { getDashboardRoute, isDashboardRoute } from './get-dashboard-route';
import { getFormRoute } from './get-form-route';
import { getIdRoute } from './get-id-route';
import { getListRoute } from './get-list-route';

import type { GetRoute } from './types/route-helpers.type';

export const getRoute = (input: GetRoute) => {
	const base = getBaseRoute(input);

	if (input.pageType === PageType.List) {
		return getListRoute(input, base);
	} else if (input.pageType === PageType.New) {
		return getFormRoute(input, base);
	} else if (isDashboardRoute(input)) {
		return getDashboardRoute(input, base);
	} else {
		return getIdRoute(input, base);
	}
};
