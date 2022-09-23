type DebugConfigKeys = 'DEBUG_NEST' | 'DEBUG_PRISMA';

export type DebugConfigType = {
	[key in DebugConfigKeys]: boolean;
};
