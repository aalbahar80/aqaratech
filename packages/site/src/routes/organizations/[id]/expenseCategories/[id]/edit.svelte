<script lang="ts" context="module">
	import ExpenseCategoryForm from '$lib/components/organization/ExpenseCategoryForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
	}: LoadEvent<{ id: string; expenseCategoryId: string }>) => {
		const settings = await stuff.api!.organizations.findSettings({
			id: params.id,
		});

		const expenseCategory = settings.expenseCategoryTree.find(
			(category) => category.id === params.expenseCategoryId,
		);

		if (!expenseCategory) {
			throw new Error('Expense category not found');
			// return {
			// 	status: 404,
			// 	error: new Error('Expense category not found'),
			// };
		}

		return { props: { expenseCategory } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let expenseCategory: Prop['expenseCategory'];
</script>

<ExpenseCategoryForm formType="update" data={expenseCategory} />
