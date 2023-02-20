import * as z from 'zod';

export type Feature =
	| `plan:${string}@${string}`
	| `feature:${string}@plan:${string}@${string}`;

export const featureSchema = z.custom<Feature>(
	(val) =>
		typeof val === 'string' &&
		(val.startsWith('plan:') || val.startsWith('feature:')),
	(val: unknown) => ({
		message: 'Invalid tier plan or feature',
		received: val,
	}),
);
