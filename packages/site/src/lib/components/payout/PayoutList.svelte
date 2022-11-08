<script lang="ts">
	import type { PaginatedPayoutDto } from '$api/openapi';
	import { page } from '$app/stores';
	import PayoutCard from '$components/payout/PayoutCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { getRoute, PageType } from '@self/utils';

	export let payouts: PaginatedPayoutDto;
</script>

<StackedList
	entity="payout"
	count={payouts.results.length}
	formButtonProps={{
		entity: 'payout',
		formUrl: getRoute({
			entity: 'payout',
			pageType: PageType.New,
			params: $page.params,
		}),
	}}
>
	{#each payouts.results as payout, idx (payout.id)}
		<li>
			<PayoutCard {payout} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={payouts.pagination} />
</StackedList>
