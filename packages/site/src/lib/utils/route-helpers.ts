import { entitiesMap, type EntitiesMap, type Entity } from '@self/utils';

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
	const [, entity, id] = pathname.match(/^\/([^/]+)\/([^/]+)$/) || [];
	if (entity && id) {
		return { entity: entity as EntitiesMap<Entity>['urlName'], id };
	} else {
		throw new Error(`Could not infer route from pathname: ${pathname}`);
	}
};

export const createFileHref = (pathname: string) => {
	const current = inferRoute(pathname);
	const href = create({
		entity: 'file',
		predefined: new Map([
			['relationKey', current.entity],
			['relationValue', current.id],
		]),
	});
	return href;
};

// export const idFieldToUrlName = <T extends Entity>(
// 	field: EntitiesMap<T>['idField'],
// ): EntitiesMap<T>['urlName'] => {
// 	const entity = Object.entries(entitiesMap).find(
// 		([, value]) => value.idField === field,
// 	);
// 	if (entity) {
// 		return entity[1].urlName;
// 	} else {
// 		throw new Error(`Could not find urlName for idField: ${field}`);
// 	}
// };
