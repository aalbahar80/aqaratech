import type { ColumnHelper } from '@tanstack/svelte-table';
import type { Union } from 'ts-toolbelt';

type ColumnHelperDto<T> = ColumnHelper<T>;

// @ts-expect-error we only want the second type parameter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SecondArg<first = unknown, second = unknown> = second;

/**
 * Removes undefined from the type of the second argument of a given type.
 */
type NonUndefinedSecondGeneric<T extends SecondArg> = T extends SecondArg<
	unknown,
	infer second
>
	? second extends Union.Exclude<second, never>
		? T
		: never
	: never;

/**
 * A type that represents a union of the return types of the column helper functions
 */
export type ColumnDto<T> = NonUndefinedSecondGeneric<
	ReturnType<ColumnHelperDto<T>[keyof ColumnHelperDto<T>]>
>;
