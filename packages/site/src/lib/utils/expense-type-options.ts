import type { Option } from '$lib/models/interfaces/option.interface';
import type { ExpenseCategoryDto } from '@self/sdk';
import deepMapValues from 'just-deep-map-values';
import * as d3 from 'd3';

/**
 * Takes a list of expense categories and converts them to a list of options
 * to be consumed by a select or combobox input.
 */
export const parseExpenseTypeOptions = (
	categories: ExpenseCategoryDto[],
): Option[] => {
	const root = d3
		.stratify<ExpenseCategoryDto>()
		.id((d) => d.id.toString())
		.parentId((d) => {
			if (d.id === 'root') return null;
			if (!d.parentId) return 'root';
			return categories.find((c) => c.id === d.parentId)?.id.toString();
		})([{ id: 'root', parentId: null, labelEn: '' }, ...categories]);

	const options: Option[] = [];

	root.eachBefore((leaf) => {
		if (leaf.id === 'root') return;
		const labelPrefix =
			leaf.depth > 1
				? '\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(leaf.depth - 1)
				: '';
		options.push({
			value: leaf.id,
			label: labelPrefix + '' + leaf.data.labelEn,
		});
	});

	return options;
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
