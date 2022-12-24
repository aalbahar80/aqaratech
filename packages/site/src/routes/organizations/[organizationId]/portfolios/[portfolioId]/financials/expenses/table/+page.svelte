<script lang="ts">
	import type { PageData } from './$types';

	import ExpenseTable from '$lib/components/expense/ExpenseTable.svelte';

	export let data: PageData;
</script>

<ExpenseTable data={data.expenses} />
