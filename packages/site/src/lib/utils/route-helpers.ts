import {
	entitiesMap,
	fromUrl,
	isEntityUrlName,
	type Entity,
} from '@self/utils';

type Predefined = Map<string, any> | false | undefined;

export const create = ({
	entity,
	predefined,
}: {
	entity: Entity;
	predefined?: Predefined;
}) => {
	const formBaseUrl = `/${entitiesMap[entity].urlName}/new`;

	if (predefined) {
		return `${formBaseUrl}?${new URLSearchParams([...predefined])}`;
	} else {
		return formBaseUrl;
	}
};

export const settings = (orgId: string) => ({
	organization: `/organizations/${orgId}/settings/organization`,
	tree: `/organizations/${orgId}/settings/expense-tree`,
});

export const inferRoute = (pathname: string) => {
	const [, urlName, id] = pathname.split('/');

	if (urlName && isEntityUrlName(urlName) && id) {
		const entity = fromUrl(urlName);
		return { entity, id };
	} else {
		throw new Error(`Could not infer route from pathname: ${pathname}`);
	}
};
