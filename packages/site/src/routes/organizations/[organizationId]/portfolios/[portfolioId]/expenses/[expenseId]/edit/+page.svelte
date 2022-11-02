<script lang="ts">
	import ExpenseForm from '$lib/components/expense/ExpenseForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExpenseForm data={data.expense} expenseTypes={data.expenseTypes} />
