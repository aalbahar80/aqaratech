<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Expense } from '$lib/models/classes';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { ExpenseDto } from '@self/sdk';

	export let expense: ExpenseDto;

	let details: [string, string | null][];
	$: details = [
		['Post Date', toUTCFormat(expense.postAt)],
		['Amount', kwdFormat(expense.amount)],
		// TODO fix
		['Category', `${expense.category?.en} - ${expense.category?.ar}`],
		['Memo', expense.memo],
	];
</script>

<Heading title={Expense.singularCap} id={expense.id} entity={Expense.entity}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={expense.breadcrumbs} />
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
