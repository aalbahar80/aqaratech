<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTypePortfolio } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';

	import type { ExpenseDto } from '$api/openapi';

	export let expense: ExpenseDto;
</script>

<Heading
	title={$L.entity.expense.singular()}
	id={expense.id}
	entity="expense"
	onDelete={async (api) => {
		await api.expenses.remove({ id: expense.id });

		const url = getRoute({
			entity: 'portfolio',
			id: expense.portfolioId,
			pageType: PageTypePortfolio.Expenses,
			params: $page.params,
		});

		return url;
	}}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={expense.breadcrumbs} />
	</svelte:fragment>
</Heading>
