<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Expense } from '$lib/models/classes';
	import { kwdFormat, dateFormat } from '$lib/utils/common';
	import type { Load } from './__types/[id]';

	export const load: Load = async ({ params, fetch, session }) => {
		const expense = session.authz?.isAdmin
			? await trpc(fetch).query('expenses:read', params.id)
			: await trpc(fetch).query('owner:expenses:read', params.id);

		return { props: { expense } };
	};
</script>

<script lang="ts">
	type Expense = InferQueryOutput<'expenses:read'>;
	export let expense: Expense;

	let details: [string, string | null][];
	$: details = [
		['Post Date', dateFormat(expense.postAt)],
		['Amount', kwdFormat(expense.amount)],
		['Category', `${expense.category?.en} - ${expense.category?.ar}`],
		['Memo', expense.memo],
	];
</script>

<Heading title={Expense.singularCap} id={expense.id} entity={Expense.entity}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={{
				portfolio: expense.portfolio?.id,
				property: expense.property?.id,
				unit: expense.unit?.id,
			}}
		/>
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
