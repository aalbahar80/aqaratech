<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Client, Expense, Property, Unit } from '$lib/models/classes';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import type { Load } from './[id]';

	export const load: Load = async ({ params, fetch }) => {
		const expense = await trpc(fetch).query('expenses:read', params.id);
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
		['Client', expense.client ? Client.getLabel(expense.client) : '-'],
		['Property', expense.property ? Property.getLabel(expense.property) : '-'],
		['Unit', expense.unit ? Unit.getLabel(expense.unit) : '-'],
		['Created on', dateFormat(expense.createdAt)],
		['Last updated', expense.updatedAt.toLocaleString()],
	];
</script>

<Heading title={Expense.singularCap} id={expense.id} entity={Expense.entity} />
<DetailsPane {details} />
