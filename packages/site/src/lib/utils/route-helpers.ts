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
	tree: `/organizations/${orgId}/settings/expense-tree`,
});

const inferRoute = (pathname: string) => {
	const [, entity, id] = pathname.match(/^\/([^/]+)\/([^/]+)$/) || [];
	if (entity && id) {
		return { entity: entity as EntityTitle, id };
	} else {
		throw new Error(`Could not infer route from pathname: ${pathname}`);
	}
};

export const createFileHref = (pathname: string) => {
	const current = inferRoute(pathname);
	const href = create({
		entity: 'files',
		predefined: new Map([[entityNameMap[current.entity].idField, current.id]]),
	});
	return href;
};

export const idFieldToUrlName = (field: string) => {
	const entity = Object.keys(entityNameMap).find(
		(key) => entityNameMap[key].idField === field,
	);
	if (entity) {
		return entityNameMap[entity].urlName;
	} else {
		throw new Error(`Could not find urlName for idField: ${field}`);
	}
};
