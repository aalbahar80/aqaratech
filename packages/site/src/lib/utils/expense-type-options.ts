import type { Option } from '$lib/models/interfaces/option.interface';
import type { ExpenseCategoryDto } from '@self/sdk';
import * as d3 from 'd3';

export type ExpenseNode = d3.HierarchyNode<ExpenseCategoryDto>;
const rootId = 'root';

export const toHeirarchy = (
	categories: ExpenseCategoryDto[],
): d3.HierarchyNode<ExpenseCategoryDto> => {
	if (!categories.some((c) => c.id === rootId)) {
		// don't duplicate the root node
		categories.push({
			id: rootId,
			parentId: null,
			labelEn: 'Root',
			labelAr: 'Root',
		});
	}
	const root = d3
		.stratify<ExpenseCategoryDto>()
		.id((d) => d.id)
		.parentId((d) => {
			if (d.id === rootId) return null;
			if (!d.parentId) return rootId;
			return categories.find((c) => c.id === d.parentId)?.id;
		})(categories);
	return root;
};

export const fromHeirarchy = (
	hierarchy: d3.HierarchyNode<ExpenseCategoryDto>,
	updated: d3.HierarchyNode<ExpenseCategoryDto>[],
): ExpenseCategoryDto[] => {
	const categories: ExpenseCategoryDto[] = updated.map((d) => d.data);
	console.log(`${categories.length} updates`, categories);

	console.log(`${hierarchy.descendants().length} originals`);
	hierarchy.descendants().forEach((d) => {
		const category = categories.find((c) => c.id === d.data.id);
		if (category) return;

		categories.push(d.data);
	});

	return categories;
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
