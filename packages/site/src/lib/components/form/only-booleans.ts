// A generic type helper which takes an object type, and returns an array of the keys which have a type of boolean.

export type OnlyBooleans<T> = {
	[K in keyof T]: T[K] extends boolean | undefined ? K : never;
}[keyof T];

// export type PickBooleans<T> = Pick<T, OnlyBooleans<T>>;
export type PickBooleans<T> = {
	[K in keyof Required<T> as Extract<K, OnlyBooleans<T>>]: T[K] extends
		| boolean
		| undefined
		? true
		: never;
};
