import { z } from 'zod';

import type { PageLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/require-await
export const load: PageLoad = async ({ url: { searchParams } }) => {
	// TODO satsifies satisfies Readonly<Entity[]>;
	const keys = ['organization', 'portfolio', 'tenant'] as const;

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
