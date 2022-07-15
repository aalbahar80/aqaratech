import type { EntityTitle } from '$lib/models/types/entity.type';
import { entityNameMap } from '$lib/constants/names';

type Predefined = Map<string, any> | false | undefined;

export const create = ({
	entity,
	predefined,
}: {
	entity: EntityTitle;
	predefined?: Predefined;
}) => {
	console.log({ entity }, 'route-helpers.ts ~ 13');
	const formBaseUrl = `/${entityNameMap[entity].urlName}/new`;

	if (predefined) {
		return `${formBaseUrl}?${new URLSearchParams([...predefined])}`;
	} else {
		return formBaseUrl;
	}
};
