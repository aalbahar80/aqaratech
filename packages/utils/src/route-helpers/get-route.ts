import { PageType } from 'src/route-helpers/enums/page-type.enum';
import { getBaseRoute } from 'src/route-helpers/get-base-route';
import { getFormRoute } from 'src/route-helpers/get-form-route';
import { getIdRoute } from 'src/route-helpers/get-id-route';
import { getListRoute } from 'src/route-helpers/get-list-route';
import type { GetRoute } from 'src/route-helpers/types/route-helpers.type';

export const getRoute = (input: GetRoute) => {
	const base = getBaseRoute(input);

	if (input.pageType === PageType.List) {
		return getListRoute(input, base);
	} else if (input.pageType === PageType.New) {
		return getFormRoute(input, base);
	} else {
		return getIdRoute(input, base);
	}
};
