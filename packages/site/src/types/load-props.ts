/**
 * Infer any `props` returned by a `load` function.
 */
export type LP<T extends (a: any) => Promise<{ props: any }>> = Awaited<
	ReturnType<T>
>['props'];
