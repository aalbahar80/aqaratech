import { create, inferRoute } from '$lib/utils/route-helpers';
import { CreateRelationKeyEnum } from '$api/openapi';

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
): entityTitle is CreateRelationKeyEnum => {
	const isValid = Object.values(CreateRelationKeyEnum).find(
		(key) => key === entityTitle,
	);
	return !!isValid;
};
