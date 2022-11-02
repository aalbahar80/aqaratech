<script lang="ts">
	import { page } from '$app/stores';
	import PayoutCard from '$components/payout/PayoutCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedPayoutDto } from '$api/openapi';

	export let payouts: PaginatedPayoutDto;
</script>

<StackedList
	entity="payout"
	count={payouts.results.length}
	formUrl={create({
		entity: 'payout',
		predefined: new Map([['portfolioId', $page.params.portfolioId]]),
	})}
>
	{#each payouts.results as payout, idx (payout.id)}
		<li>
			<PayoutCard {payout} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={payouts.pagination} />
</StackedList>
