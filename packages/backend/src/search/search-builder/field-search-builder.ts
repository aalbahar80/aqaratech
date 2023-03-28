const mode = 'insensitive' as const;

export const fieldSearchBuilder = <
	const T extends string,
	Query extends string,
>(
	field: T,
	query: Query,
) => {
	if (typeof field !== 'string') {
		throw new Error('Invalid field');
	}

	const contains = {
		[field]: {
			contains: query,
			mode,
		},
	};

	// Query needs handling to prevent errors when using spaces, etc.
	const searchReplace = {
		[field]: {
			// https://github.com/prisma/prisma/issues/8939#issuecomment-933990947
			search: query.replace(/\s/g, '_'),
			mode,
		},
	};

	return [
		// prettier-mulitline-workaround
		contains,
		searchReplace,
	];
};
