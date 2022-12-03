<script lang="ts">
	import type { PayoutDto } from '$api/openapi';
	import { page } from '$app/stores';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { getRoute, PageTypePortfolio } from '@self/utils';

	export let payout: PayoutDto;
</script>

<Heading
	title="Payout"
	id={payout.id}
	entity="payout"
	disallowEdit
	onDelete={async (api) => {
		await api.payouts.remove({ id: payout.id });

		const url = getRoute({
			entity: 'portfolio',
			id: payout.portfolioId,
			pageType: PageTypePortfolio.PayoutsTable,
			params: $page.params,
		});

		return url;
	}}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={payout.breadcrumbs} />
	</svelte:fragment>
</Heading>
