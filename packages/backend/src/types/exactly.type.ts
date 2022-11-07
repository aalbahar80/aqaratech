/**
 * A generic type utility that can be used to restrict a
 * class to only known properties.
 */
export type Exactly<T, U> = {
	[K in keyof U]: K extends keyof T ? T[K] : never;
};
