<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import ExpensePage from '$lib/components/expense/ExpensePage.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		['Post Date', toUTCFormat(data.expense.postAt)],
		['Amount', kwdFormat(data.expense.amount)],
		['Category', data.expense.expenseType?.labelEn],
		['Memo', data.expense.memo],
	] as [string, string | null][];
</script>

<ExpensePage expense={data.expense} />
<DetailsPane {details} />
