<script lang="ts">
	import ExpenseCategoryForm from '$lib/components/organization/ExpenseCategoryForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExpenseCategoryForm formType="update" data={data.expenseCategory} />
