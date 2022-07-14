<script lang="ts" context="module">
	import ExpenseForm from '$lib/components/expense/ExpenseForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const expense = await stuff.api!.expenses.findOne({ id: params.id });

		return { props: { expense } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let expense: Prop['expense'];
</script>

<ExpenseForm formType="update" data={expense} />
