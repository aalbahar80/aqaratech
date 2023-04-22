/** Workaround for prisma type limitations. Asserts `computed` is the correct
 * shape. Disregards the fact that prisma says this could be `null`. Remove once
 * prisma fixes this. Most likely when view support is out of beta.
 *
 * Background: `computed` is the name of a field in the prisma schema to link
 * to a view. */
export type ComputedCompatPrisma<T> = T extends { computed: infer U | null }
	? U extends null | undefined
		? never
		: Omit<T, 'computed'> & { computed: U | null }
	: never;
