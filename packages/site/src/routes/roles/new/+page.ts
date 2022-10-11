import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
import { entitiesMap, isEntity } from '@self/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams } }) => {
	// Check correct url params are present
	const entity = searchParams.get('entity');
	const entityId = searchParams.get('entityId');

	if (!isEntity(entity) || !entityId) {
		throw new Error('No predefined role in url');
	}

	let roleType: PredefinedRole['roleType'] | undefined = undefined;
	if (entity === 'organization') {
		roleType = 'ORGADMIN';
	} else if (entity === 'portfolio') {
		roleType = 'PORTFOLIO';
	} else if (entity === 'tenant') {
		roleType = 'TENANT';
	} else {
		throw new Error('Unknown entity type');
	}

	const idField = entitiesMap[entity].idField;

	if (!idField) {
		throw new Error('Unable to get idField');
	}

	// TODO: use satisfies
	const predefined: PredefinedRole = { entity, entityId, idField, roleType };

	return { predefined };
};
