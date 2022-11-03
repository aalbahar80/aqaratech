import { getFormRoute } from '$lib/utils/route-helpers/get-form-route';
import { getIdRoute } from '$lib/utils/route-helpers/get-id-route';
import { getListRoute } from '$lib/utils/route-helpers/get-list-route';
import {
	PageType,
	type GetRouteInput,
} from '$lib/utils/route-helpers/route-helpers.type';

export const getRoute = (input: GetRouteInput) => {
	if (input.pageType === PageType.Id || input.pageType === PageType.Edit) {
		return getIdRoute(input);
	} else if (input.pageType === PageType.New) {
		return getFormRoute(input);
	} else if (input.pageType === PageType.List) {
		return getListRoute(input);
	} else {
		throw new Error(`Invalid pageType`);
	}
};
