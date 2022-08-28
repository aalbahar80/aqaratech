<script lang="ts">
	import { page } from '$app/stores';
	import PayoutCard from '$components/payout/PayoutCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedPayoutDto } from '@self/sdk';

	export let payouts: PaginatedPayoutDto;

	const formUrl = create({
		entity: 'payout',
		predefined:
			$page.url.pathname.startsWith('/portfolios') &&
			new Map<string, any>([
				['portfolioId', $page.url.pathname.split('/').pop()],
			]),
	});
</script>

<StackedList entity="payout" count={payouts.results.length} {formUrl}>
	{#each payouts.results as payout, idx (payout.id)}
		<li>
			<PayoutCard {payout} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={payouts.pagination} />
</StackedList>
