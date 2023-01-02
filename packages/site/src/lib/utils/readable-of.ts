import type { Readable } from 'svelte/store';

export type ReadableOf<T extends Readable<unknown>> = T extends Readable<
	infer U
>
	? U
	: never;
