import type { generateExpenseCategoryTree } from '../constants';

/**
 * Return a random element from an array.
 */
export const random = <T>(array: T[]): T => {
	const element = array[Math.floor(Math.random() * array.length)];

	if (array.length === 0) {
		throw new Error('Array is empty');
	}

	if (element === undefined) {
		throw new Error('Unable to get random element from array');
	}

	return element;
};

/**
 * Find an element in an array or throw an error.
 */
export const findOrFail = <T>(
	array: T[],
	predicate: (element: T) => boolean,
): T => {
	const element = array.find(predicate);

	if (array.length === 0) {
		throw new Error('Array is empty');
	}

	if (element === undefined) {
		throw new Error('Unable to find element in array with predicate');
	}

	return element;
};

type Tree = ReturnType<typeof generateExpenseCategoryTree>;

export const randomCategory = (tree: Tree): Tree[number] => {
	const maxAttempts = 10;
	let attempts = 0;

	while (attempts < maxAttempts) {
		const category = random(tree);

		if (!category.isGroup) {
			return category;
		}

		attempts++;
	}

	throw new Error('Unable to find random category');
};
