<script lang="ts">
	import ExpenseTable from '$lib/components/expense/ExpenseTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExpenseTable data={data.expenses} />
