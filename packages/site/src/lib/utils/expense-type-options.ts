import type { Option } from '$lib/models/interfaces/option.interface';
import type { ExpenseTypeDto } from '@self/sdk';

export const parseExpenseTypeOptions = (types: ExpenseTypeDto[]): Option[] => {
	const options = types.map((type) => {
		const path = getPathToRoot(type, types);
		return {
			value: type.id,
			// prefix the label dashes to make it look like a tree
			label: `${
				path.length > 0
					? '\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(path.length)
					: ''
			} ${type.labelEn}`,
		};
	});
	return options;
};

const getPathToRoot = (type: ExpenseTypeDto, types: ExpenseTypeDto[]) => {
	const pathToRoot: number[] = [];
	if (type.parentId) {
		pathToRoot.push(type.parentId);
		let parent = types.find((t) => t.id === type.parentId);
		while (parent?.parentId) {
			pathToRoot.push(parent.parentId);
			parent = types.find((t) => t.id === parent?.parentId);
		}
	}
	return pathToRoot;
};
