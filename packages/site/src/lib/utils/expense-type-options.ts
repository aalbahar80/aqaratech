import type { Option } from '$lib/models/interfaces/option.interface';
import type { ExpenseCategoryDto } from '@self/sdk';
import deepMapValues from 'just-deep-map-values';

export const parseExpenseTypeOptions = (
	types: ExpenseCategoryDto[],
): Option[] => {
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

const getPathToRoot = (
	type: ExpenseCategoryDto,
	types: ExpenseCategoryDto[],
) => {
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

export interface ExpenseCategoryNode
	extends Pick<ExpenseCategoryDto, 'id' | 'parentId' | 'labelEn'> {
	items: ExpenseCategoryNode[];
}

export type Nodes = Record<string, ExpenseCategoryNode>;

/**
 * For use in expense-dnd-tree.
 */
export const getExpenseTypeTree = (
	target: ExpenseCategoryDto,
	categories: ExpenseCategoryDto[],
): ExpenseCategoryNode[] => {
	const directChildren = categories.filter(
		(category) => category.parentId === target.id,
	);

	const result = directChildren.map((child) => ({
		...child,
		items: getExpenseTypeTree(child, categories),
	}));

	return result;
};

/**
 * Prepares an expense type tree for db insertion after it has been edited
 */
export const getUpdatedExpenses = (
	nodes: Nodes,
): Partial<ExpenseCategoryDto>[] => {
	// TODO change type to UpdateExpenseTypeDto
	const newTree: Partial<ExpenseCategoryDto>[] = [];

	let currentParent: number | null | 'root' = null;
	const getNewParents = (value: ExpenseCategoryNode, key: string) => {
		if (key === 'id') {
			// store the id of the current node being processed, we will use it as a parentId if it has children
			currentParent = value as unknown as ExpenseCategoryNode['id'];
		}

		if (key === 'items') {
			const children = value as unknown as ExpenseCategoryNode['items'];
			children.forEach((child) => {
				// set the parentId of any children we find to the id of the current node being processed
				const newItem = {
					id: child.id,
					labelEn: child.labelEn,
					parentId: currentParent === 'root' ? null : currentParent,
				};
				newTree.push(newItem);
			});
		}
	};

	deepMapValues(nodes, getNewParents);

	return newTree;
};
