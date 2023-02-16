import type { Union } from 'ts-toolbelt';

// use Union.Replace to replace any instance of string in a union with Date
export type StringifyDate<T> = Union.Replace<T, string, Date>;

export type StringifyDateKeys<T, K extends keyof T> = {
	[P in keyof T]: P extends K
		? string extends T[P]
			? StringifyDate<T[P]>
			: T[P]
		: T[P];
};

export type DateAsString<T> = {
	[K in keyof T]: T[K] extends Date
		? Date | string
		: T[K] extends Date | null
		? Date | string | null
		: T[K];
};
