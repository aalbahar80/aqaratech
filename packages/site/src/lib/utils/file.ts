import { create, inferRoute } from '$lib/utils/route-helpers';
import { FileRelationKeyEnum, type FileRelationKey } from '@self/utils';

export const createFileHref = (pathname: string) => {
	const current = inferRoute(pathname);
	const href = create({
		entity: 'file',
		predefined: new Map([
			['relationKey', current.entity.title],
			['relationValue', current.id],
		]),
	});
	return href;
};

export const hasFileSupport = (
	entityTitle: string,
): entityTitle is FileRelationKey => {
	const isValid = Object.values(FileRelationKeyEnum).find(
		(key) => key === entityTitle,
	);
	return !!isValid;
};
