import { getFormRoute } from '$lib/utils/route-helpers/get-form-route';
import { getIdRoute } from '$lib/utils/route-helpers/get-id-route';
import type { GetRouteInput } from '$lib/utils/route-helpers/route-helpers.type';

export const getRoute = (input: GetRouteInput) => {
	if ('id' in input) {
		return getIdRoute(input);
	} else {
		return getFormRoute(input);
	}
};
