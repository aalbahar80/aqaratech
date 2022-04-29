<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import {
		ClientModel,
		PropertyModel,
		UnitModel,
	} from '$lib/models/interfaces';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { ExpenseModel } from '$models/interfaces/expense.interface';
	import type { Load } from './[id]';

	export const load: Load = async ({ params }) => {
		const expense = await trpc.query('expenses:read', params.id);
		return { props: { expense } };
	};
</script>

<script lang="ts">
	type Expense = InferQueryOutput<'expenses:read'>;
	export let expense: Expense;

	let details: [string, string | null][];
	$: details = [
		['Post At', expense.postAt?.toLocaleString() ?? '-'],
		['Amount', kwdFormat(expense.amount)],
		['Category', expense.category],
		['Memo', expense.memo],
		['Client', expense.client ? ClientModel.getLabel(expense.client) : '-'],
		[
			'Property',
			expense.property ? PropertyModel.getLabel(expense.property) : '-',
		],
		['Unit', expense.unit ? UnitModel.getLabel(expense.unit) : '-'],
		['Created on', dateFormat(expense.createdAt)],
		['Last updated', expense.updatedAt.toLocaleString()],
	];
</script>

<Heading
	title={ExpenseModel.singularCap}
	id={expense.id}
	entity={ExpenseModel.name}
/>
<DetailsPane {details} />
