const mode = 'insensitive' as const;
import { Function } from 'ts-toolbelt';

export const searchBuilder = <T extends string, Query extends string>(
	field: Function.Narrow<T>,
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
			search: query.replace(/[\s\n\t]/g, '_'),
			mode,
		},
	};

	const searchSplit = {
		[field]: {
			// https://github.com/prisma/prisma/issues/8939#issuecomment-909388537
			search: query.split(' ').join(' & '),
			mode,
		},
	};

	return [
		// prettier-mulitline-workaround
		// TODO: Review differences
		contains,
		searchReplace,
		searchSplit,
	];
};
