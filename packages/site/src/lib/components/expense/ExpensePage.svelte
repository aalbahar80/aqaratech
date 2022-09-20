<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { ExpenseDto } from '$api/openapi';

	export let expense: ExpenseDto;
</script>

<Heading title="Expense" id={expense.id} entity="expense">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={expense.breadcrumbs} />
	</svelte:fragment>
</Heading>
