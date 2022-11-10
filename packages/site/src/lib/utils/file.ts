import {
	FileRelationKeyEnum,
	getRoute,
	inferUrlRelation,
	PageType,
	type FileRelationKey,
} from '@self/utils';

export const createFileHref = (
	pathname: string,
	params: Record<string, string>,
): string => {
	const relation = inferUrlRelation(pathname);

	const url = getRoute({
		entity: 'file',
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
