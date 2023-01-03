import type { RouteParams } from '@self/utils';
import {
	FileRelationKeyEnum,
	getRoute,
	inferUrlRelation,
	PageType,
	type FileRelationKey,
	type GetFormRouteWithRelation,
} from '@self/utils';

export const getFormRouteWithRelation = ({
	entity,
	pathname,
	params,
	redirectTo,
}: {
	entity: GetFormRouteWithRelation['entity'];
	pathname: string;
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
