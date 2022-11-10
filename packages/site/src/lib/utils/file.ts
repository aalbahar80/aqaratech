import {
	FileRelationKeyEnum,
	getRoute,
	inferUrlRelation,
	PageType,
	type FileRelationKey,
	type GetFormRouteWithRelation,
} from '@self/utils';

export const getFormRouteWithRelation = (
	entity: GetFormRouteWithRelation['entity'],
	pathname: string,
	params: Record<string, string>,
): string => {
	const relation = inferUrlRelation(pathname);

	const url = getRoute({
		entity,
		params,
		pageType: PageType.New,
		predefined: {
			relationKey: relation.entity,
			relationValue: relation.id,
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
