<script lang="ts" context="module">
	import ExpenseForm from '$lib/components/expense/ExpenseForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		session,
	}: LoadEvent<{ id: string }>) => {
		const [expense, expenseTypes] = await Promise.all([
			stuff.api!.expenses.findOne({ id: params.id }),
			stuff.api!.meta.findExpenseTypes({
				organizationId: session.user?.role?.organizationId,
			}),
		]);

		return { props: { expense, expenseTypes } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let expense: Prop['expense'];
	export let expenseTypes: Prop['expenseTypes'];
</script>

<ExpenseForm formType="update" data={expense} {expenseTypes} />
