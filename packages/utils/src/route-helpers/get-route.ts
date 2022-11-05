import { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { PageType } from 'src/route-helpers/enums/page-type.enum';
import { getBaseRoute } from 'src/route-helpers/get-base-route';
import { getFormRoute } from 'src/route-helpers/get-form-route';
import { getIdRoute } from 'src/route-helpers/get-id-route';
import { getListRoute } from 'src/route-helpers/get-list-route';
import type { GetRouteInput } from 'src/route-helpers/types/route-helpers.type';

export const getRoute = (input: GetRouteInput) => {
	const base = getBaseRoute(input);

	if (input.pageType === PageType.List) {
		return getListRoute(input, base);
	} else if (input.pageType === PageType.New) {
		return getFormRoute(input, base);
	} else {
		return getIdRoute(input, base);
	}
};

getRoute({
	entity: 'unit',
	id: '1',
	params: {
		organizationId: '1',
		portfolioId: '1',
	},
	// pageType: PageType.Id,
	pageType: PageTab.Files,
});

// getRoute({
// 	entity: 'unit',
// 	id: '1',
// 	params: {
// 		organizationId: '1',
// 		portfolioId: '1',
// 	},
// 	pageType: PageType.Tab,
// 	pageTab: PageTab.Financials,
// });
