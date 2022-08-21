<script lang="ts">
	import ExpenseForm from '$lib/components/expense/ExpenseForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExpenseForm
	formType="create"
	portfolios={data.portfolios}
	properties={data.properties}
	units={data.units}
	predefined={data.predefined}
	expenseTypes={data.expenseTypes}
/>
