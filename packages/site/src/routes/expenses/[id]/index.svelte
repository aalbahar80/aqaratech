<script lang="ts" context="module">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import ExpensePage from '$lib/components/expense/ExpensePage.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const expenseId = params.id;

		const [expense, files] = await Promise.all([
			stuff.api!.expenses.findOne({ id: expenseId }),
			stuff.api!.files.findAll({
				relationKey: 'expense',
				relationValue: params.id,
			}),
		]);
		return { props: { expense, files } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let expense: Prop['expense'];
	export let files: Prop['files'];

	$: details = [
		['Post Date', toUTCFormat(expense.postAt)],
		['Amount', kwdFormat(expense.amount)],
		['Category', expense.expenseType?.labelEn],
		['Memo', expense.memo],
	] as [string, string | null][];
</script>

<ExpensePage {expense} />
<DetailsPane {details} {files} />
