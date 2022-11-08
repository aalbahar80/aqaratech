export interface TransformableInfo {
	level: string;
	message: any;
	[key: string]: any;
}

export type TransformFunction = (
	info: TransformableInfo,
	opts?: any,
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
