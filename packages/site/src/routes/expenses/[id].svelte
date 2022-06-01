<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Expense } from '$lib/models/classes';
	import { kwdFormat } from '$lib/utils/common';
	import type { Load } from './__types/[id]';

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
		['Post Date', expense.postAt?.toLocaleString() ?? '-'],
		['Amount', kwdFormat(expense.amount)],
		['Category', `${expense.category?.en} - ${expense.category?.ar}`],
		['Memo', expense.memo],
		// ['Client', expense.client ? Client.getLabel(expense.client) : '-'],
		// ['Property', expense.property ? Property.getLabel(expense.property) : '-'],
		// ['Unit', expense.unit ? Unit.getLabel(expense.unit) : '-'],
	];

	const crumbs = [
		expense.client ? ['clients', expense.client.id] : null,
		expense.property ? ['properties', expense.property.id] : null,
		expense.unit ? ['units', expense.unit.id] : null,
	].filter(Boolean);
</script>

<Heading title={Expense.singularCap} id={expense.id} entity={Expense.entity}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb {crumbs} />
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
