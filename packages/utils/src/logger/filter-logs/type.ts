export interface TransformableInfo {
	[key: string]: unknown;
	level: string;
	message: unknown;
}

export type TransformFunction = (
	info: TransformableInfo,
	opts?: unknown,
) => TransformableInfo | boolean;

// export class Format {
// 	constructor(opts?: object);

// 	options?: object;
// 	transform: TransformFunction;
// }

export type Printf = (
	templateFunction: (info: TransformableInfo) => string,
) => Format;

export interface Format {
	// constructor(opts?: object);

	options?: object;
	transform: TransformFunction;
}
