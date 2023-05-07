import { stratify } from 'd3';

import type { Option } from '$lib/models/interfaces/option.interface';
import type { ExpenseCategoryLocalized } from '$lib/stores/expense-tree-cat';
import type { HierarchyNode } from 'd3';

export type ExpenseNode = HierarchyNode<ExpenseCategoryLocalized>;
/**
 * A constant artifical id to use around the app, to avoid inconsistencies.
 */
export const ROOT_ID = 'root';
export const ROOT_NODE = {
	id: ROOT_ID,
	parentId: null,
	isGroup: true,
	labelEn: '',
	labelAr: '',
	label: '',
} satisfies ExpenseCategoryLocalized;

/**
 * Converts an array of ExpenseCategoryLocalized to HierarchyNode
 */
export const toHeirarchy = (
	categories: ExpenseCategoryLocalized[],
): HierarchyNode<ExpenseCategoryLocalized> => {
	const rootedCatogories = injectRoot(categories);

	const root = stratify<ExpenseCategoryLocalized>()
		.id((d) => d.id)
		.parentId((d) => d.parentId)(rootedCatogories)
		.sort((a, b) => a.data.labelEn.localeCompare(b.data.labelEn));
	return root;
};

/**
 * Add an artificial root node to satisfy d3's "one root" requirement.
 * Convert any node with a parentId of `null` to have a parentId of 'root'.
 */
const injectRoot = (categories: ExpenseCategoryLocalized[]) => {
	const hasRoot = categories.some((c) => c.id === ROOT_ID);
	if (hasRoot) {
		return categories;
	}

	// convert any node with a parentId of `null` to have a parentId of 'root' (the artificial root node)
	const updated = categories.map((c) => {
		// check for both null and undefined
		if (c.parentId === null || c.parentId === undefined) {
			return { ...c, parentId: ROOT_ID };
		}
		return c;
	});

	// add the artificial root node
	updated.push(ROOT_NODE);
	return updated;
};
/**
 * Takes a list of expense categories and converts them to a list of options
 * to be consumed by a select or combobox input.
 */
export const toOptions = (categories: ExpenseCategoryLocalized[]): Option[] => {
	const root = toHeirarchy(categories);
	const options: Option[] = [];

	root.eachBefore((leaf) => {
		if (leaf.id === ROOT_ID) return;
		const labelPrefix =
			leaf.depth > 1
				? '\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(leaf.depth - 1)
				: '';

		const value: ExpenseCategoryLocalized['id'] = leaf.data.id;
		options.push({
			value,
			label: labelPrefix + '' + leaf.data.label,
			disabled: leaf.data.isGroup,
		});
	});

	return options;
};
