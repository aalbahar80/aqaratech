<script lang="ts">
	import * as R from 'remeda';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import ExpensePage from '$lib/components/expense/ExpensePage.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: obj = R.merge(data.expense, {
		category: data.expense.expenseType?.labelEn,
	});
</script>

<ExpensePage expense={data.expense} />

<AutoDetailsPane
	details={obj}
	keys={['postAt', 'amount', 'category', 'memo']}
/>
