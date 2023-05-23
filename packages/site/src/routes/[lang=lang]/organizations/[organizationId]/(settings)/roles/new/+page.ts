import { z } from 'zod';

import type { PageLoad } from './$types';
import type { Entity } from '@self/utils';

export const load: PageLoad = ({ url: { searchParams } }) => {
	const keys = [
		'organization',
		'portfolio',
		'tenant',
	] as const satisfies Readonly<Entity[]>;

	const schema = z.object({
		relationKey: z.enum(keys),
		relationValue: z.string().uuid(),
	});

	const { relationKey, relationValue } = schema.parse({
		relationKey: searchParams.get('relationKey'),
		relationValue: searchParams.get('relationValue'),
	});

	return { relationKey, relationValue };
};
