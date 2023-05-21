// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<Thing> = Thing extends Function
	? Thing
	: Thing extends (infer InferredArrayMember)[]
	? DeepPartialArray<InferredArrayMember>
	: Thing extends object
	? DeepPartialObject<Thing>
	: Thing | undefined;

export type DeepPartialArray<Thing> = DeepPartial<Thing>[];

export type DeepPartialObject<Thing> = {
	[Key in keyof Thing]?: DeepPartial<Thing[Key]>;
};
