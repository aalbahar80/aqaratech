export type DateAsString<T> = {
	[K in keyof T]: T[K] extends Date
		? Date | string
		: T[K] extends Date | null
		? Date | string | null
		: T[K];
};
