import { entityNameMap } from '$lib/constants/names';
import type { EntityTitle } from '$lib/models/types/entity.type';

type Predefined = Map<string, any> | false | undefined;

export const create = ({
	entity,
	predefined,
}: {
	entity: EntityTitle;
	predefined?: Predefined;
}) => {
	const formBaseUrl = `/${entityNameMap[entity].urlName}/new`;

	if (predefined) {
		return `${formBaseUrl}?${new URLSearchParams([...predefined])}`;
	} else {
		return formBaseUrl;
	}
};

export const settings = (orgId: string) => ({
	organization: `/organizations/${orgId}/settings/organization`,
	tree: `/organizations/${orgId}/settings/tree`,
});
