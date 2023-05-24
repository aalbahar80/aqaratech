<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageTypePortfolio } from '@self/utils';

	import type { PayoutDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';

	export let payout: PayoutDto;
</script>

<Heading
	title={$L.entity.payout.singular()}
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
