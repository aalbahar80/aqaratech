import type { Option } from '$lib/models/interfaces/option.interface';
import type { ExpenseCategoryDto } from '@self/sdk';
import * as d3 from 'd3';

export type ExpenseNode = d3.HierarchyNode<ExpenseCategoryDto>;
const rootId = 'root';

export const toHeirarchy = (
	categories: ExpenseCategoryDto[],
): d3.HierarchyNode<ExpenseCategoryDto> => {
	const rootedCatogories = injectRoot(categories);
	console.log(categories);

	const root = d3
		.stratify<ExpenseCategoryDto>()
		.id((d) => d.id)
		.parentId((d) => d.parentId)(rootedCatogories);
	return root;
};

// TODO destructure params
/**
 * @param nodeInQuestion
 * The main player. updated here means potentially new children of THIS node.
 */
export const fromHeirarchy = (
	hierarchy: d3.HierarchyNode<ExpenseCategoryDto>,
	updated: d3.HierarchyNode<ExpenseCategoryDto>[],
	original: ExpenseCategoryDto[],
	nodeInQuestion: d3.HierarchyNode<ExpenseCategoryDto>,
): ExpenseCategoryDto[] => {
	const data: ExpenseCategoryDto[] = updated.map((d) => d.data);
	const categories = dejectRoot(data);
	console.log(`${categories.length} potential updates`, [...categories]);

	// what d3 considers updated differs from what we consider updated
	// For us, a node is only considered updated if it's parentId is different
	const updatedCategories = categories.filter((child) => {
		const newParentId = nodeInQuestion.data.id;
		const newParent = nodeInQuestion.data;
		// const newParent = original.find((o) => o.id === newParentId);

		// const oldSelf = original.find((o) => o.id === newSelf.id);
		// const oldParentId = oldSelf?.parentId;
		const oldParentId = child.parentId;
		const oldParent = original.find((o) => o.id === oldParentId);

		const hasNewParent = newParentId !== oldParentId;
		if (hasNewParent) {
			console.warn(
				`${child.id}: ${child.labelEn} has new parent ${newParent?.id}: ${newParent?.labelEn}. Old parent: ${oldParentId}: ${oldParent?.labelEn}`,
			);
			return hasNewParent;
		} else {
			return !hasNewParent;
		}
	});

	console.warn(`${updatedCategories.length} nodes had their parentId changed`, [
		...updatedCategories,
	]);

	console.log(`${hierarchy.descendants().length} originals`);
	hierarchy.descendants().forEach((d) => {
		const category = categories.find((c) => c.id === d.data.id);
		if (category) return;

		categories.push(d.data);
	});

	// Handle the artificial root node which was injected by `toHeirarchy` to satisfy d3's "one root" requirement.
	// This means converting any node with a parentId of 'root' back to it's original parentId of `null`.
	return categories;
};

/**
 * Add an artificial root node to satisfy d3's "one root" requirement.
 * Convert any node with a parentId of `null` to have a parentId of 'root'.
 */
export const injectRoot = (categories: ExpenseCategoryDto[]) => {
	const hasRoot = categories.some((c) => c.id === rootId);
	if (hasRoot) {
		console.debug('Root node already exists. Skipping injection.');
		return categories;
	}

	// convert any node with a parentId of `null` to have a parentId of 'root' (the artificial root node)
	const updated = categories.map((c) => {
		// check for both null and undefined
		if (c.parentId === null || c.parentId === undefined) {
			return { ...c, parentId: rootId };
		}
		return c;
	});

	// add the artificial root node
	const rootNode: ExpenseCategoryDto = {
		id: rootId,
		labelEn: 'Root',
		parentId: null,
	};

	updated.push(rootNode);
	return updated;
};

/**
 * Remove the artificial root node added by `injectRoot`.
 * Convert any node with a parentId of 'root' back to it's original parentId of `null`.
 */
export const dejectRoot = (categories: ExpenseCategoryDto[]) => {
	const hasRoot = categories.some((c) => c.id === rootId);
	const hasRootChildren = categories.some((c) => c.parentId === rootId);
	if (!hasRoot || !hasRootChildren) return categories;

	// remove the root node
	const updated = categories.filter((c) => c.id !== rootId);

	// convert any node with a parentId of 'root' back to it's original parentId of `null`
	updated.forEach((c) => {
		if (c.parentId === rootId) c.parentId = null;
	});

	return updated;
};

export const fromNode = (node: ExpenseNode): ExpenseCategoryDto => {
	return {
		id: node.data.id,
		parentId: node.data.parentId,
		labelEn: node.data.labelEn,
		labelAr: node.data.labelAr,
	};
};

/**
 * Takes a list of expense categories and converts them to a list of options
 * to be consumed by a select or combobox input.
 */
export const toOptions = (categories: ExpenseCategoryDto[]): Option[] => {
	const root = toHeirarchy(categories);
	const options: Option[] = [];

	root.eachBefore((leaf) => {
		if (leaf.id === rootId) return;
		const labelPrefix =
			leaf.depth > 1
				? '\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(leaf.depth - 1)
				: '';

		const value: ExpenseCategoryDto['id'] = leaf.data.id;
		options.push({
			value,
			label: labelPrefix + '' + leaf.data.labelEn,
		});
	});

	return options;
};
