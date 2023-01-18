import {
	FileRelationKeyEnum,
	getRoute,
	inferUrlRelation,
	PageType,
} from '@self/utils';
import type {
	RouteParams,
	FileRelationKey,
	GetFormRouteWithRelation,
} from '@self/utils';

export const getFormRouteWithRelation = ({
	entity,
	pathname,
	params,
	redirectTo,
}: {
	entity: GetFormRouteWithRelation['entity'];
	pathname: Readonly<URL>['pathname'];
	params: RouteParams;
	redirectTo: string;
}): string => {
	const relation = inferUrlRelation(pathname);

	const url = getRoute({
		entity,
		params,
		pageType: PageType.New,
		predefined: {
			relationKey: relation.entity,
			relationValue: relation.id,
			redirectTo,
		},
	});

	return url;
};

export const hasFileSupport = (
	entityTitle: string,
): entityTitle is FileRelationKey => {
	const isValid = Object.values(FileRelationKeyEnum).find(
		(key) => key === entityTitle,
	);
	return !!isValid;
};
