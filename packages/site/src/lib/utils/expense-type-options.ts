import type { ExpenseCategoryDto } from '$api/openapi';
import type { Option } from '$lib/models/interfaces/option.interface';
import type { HierarchyNode } from 'd3';
import { stratify } from 'd3';

export type ExpenseNode = HierarchyNode<ExpenseCategoryDto>;
/**
 * A constant artifical id to use around the app, to avoid inconsistencies.
 */
export const ROOT_ID = 'root';
export const ROOT_NODE: ExpenseCategoryDto = {
	id: ROOT_ID,
	parentId: null,
	isGroup: true,
	labelEn: '',
	labelAr: '',
	description: '',
};

/**
 * Converts an array of ExpenseCategoryDto to HierarchyNode
 */
export const toHeirarchy = (
	categories: ExpenseCategoryDto[],
): HierarchyNode<ExpenseCategoryDto> => {
	const rootedCatogories = injectRoot(categories);

	const root = stratify<ExpenseCategoryDto>()
		.id((d) => d.id)
		.parentId((d) => d.parentId)(rootedCatogories)
		.sort((a, b) => a.data.labelEn.localeCompare(b.data.labelEn));
	return root;
};

/**
 * Converts a HierarchyNode to an array of ExpenseCategoryDto
 */
export const fromHeirarchy = ({
	root,
	original,
}: {
	root: HierarchyNode<ExpenseCategoryDto>;
	original: ExpenseCategoryDto[];
}): ExpenseCategoryDto[] => {
	const data: ExpenseCategoryDto[] = root.descendants().map((d) => d.data);

	const allCategories = dejectRoot(data);

	// A node is only considered updated if it's parentId is different
	const updated: ExpenseCategoryDto[] = [];

	allCategories.forEach((child) => {
		const newParentId = child.parentId;

		const oldSelf = original.find((o) => o.id === child.id);
		const oldParentId = oldSelf?.parentId;

		const hasNewParent = newParentId !== oldParentId;
		if (hasNewParent) {
			updated.push({
				...child,
				parentId: newParentId,
			});
		}
	});

	if (updated.length < 1) return original;

	const result = original.map((o) => {
		const changedCategory = updated.find((u) => u.id === o.id);
		if (changedCategory) {
			return changedCategory;
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
 * Remove the artificial root node added by `injectRoot`.
 * Convert any node with a parentId of 'root' back to it's original parentId of `null`.
 */
export const dejectRoot = (categories: ExpenseCategoryDto[]) => {
	const hasRoot = categories.some((c) => c.id === ROOT_ID);
	const hasRootChildren = categories.some((c) => c.parentId === ROOT_ID);
	if (!hasRoot || !hasRootChildren) return categories;

	// remove the root node
	const updated = categories.filter((c) => c.id !== ROOT_ID);

	// convert any node with a parentId of 'root' back to it's original parentId of `null`
	updated.forEach((c) => {
		if (c.parentId === ROOT_ID) c.parentId = null;
	});

	return updated;
};

/**
 * Takes a list of expense categories and converts them to a list of options
 * to be consumed by a select or combobox input.
 */
export const toOptions = (categories: ExpenseCategoryDto[]): Option[] => {
	const root = toHeirarchy(categories);
	const options: Option[] = [];

	root.eachBefore((leaf) => {
		if (leaf.id === ROOT_ID) return;
		const labelPrefix =
			leaf.depth > 1
				? '\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(leaf.depth - 1)
				: '';

		const value: ExpenseCategoryDto['id'] = leaf.data.id;
		options.push({
			value,
			label: labelPrefix + '' + leaf.data.labelEn,
			disabled: leaf.data.isGroup,
		});
	});

	return options;
};
