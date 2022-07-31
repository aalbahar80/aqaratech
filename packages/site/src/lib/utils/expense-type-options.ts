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

export const fromHeirarchy = ({
	hierarchy,
	original,
}: {
	hierarchy: d3.HierarchyNode<ExpenseCategoryDto>;
	original: ExpenseCategoryDto[];
}): ExpenseCategoryDto[] => {
	const data: ExpenseCategoryDto[] = hierarchy.descendants().map((d) => d.data);

	const potentialCategories = dejectRoot(data);
	console.log(`${potentialCategories.length} potential updates`, [
		...potentialCategories,
	]);

	// what d3 considers updated differs from what we consider updated
	// For us, a node is only considered updated if it's parentId is different
	const updatedCategories: ExpenseCategoryDto[] = [];

	potentialCategories.forEach((child) => {
		const newParentId = child.parentId;
		const newParent = original.find((o) => o.id === newParentId);

		const oldSelf = original.find((o) => o.id === child.id);
		const oldParentId = oldSelf?.parentId;
		const oldParent = original.find((o) => o.id === oldParentId);

		const hasNewParent = newParentId !== oldParentId;
		if (hasNewParent) {
			console.warn(
				`${child.id}: ${child.labelEn} has new parent ${newParent?.id}: ${newParent?.labelEn}. Old parent: ${oldParentId}: ${oldParent?.labelEn}`,
			);
			updatedCategories.push({
				...child,
				parentId: newParentId,
			});
		}
	});

	// TODO original right count? contains root?
	// is original same as heirarchy.descendants()?
	console.log(
		`${updatedCategories.length} updated categories out of a total of ${original.length}`,
		updatedCategories,
	);

	if (updatedCategories.length < 1) return original;

	const result = original.map((o) => {
		const updated = updatedCategories.find((u) => u.id === o.id);
		if (updated) {
			return updated;
		}
		return o;
	});

	return result;
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
