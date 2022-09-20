<script lang="ts">
	import { goto } from '$app/navigation';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { PayoutDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';

	export let payout: PayoutDto;
</script>

<Heading
	title="Payout"
	id={payout.id}
	entity="payout"
	disallowEdit
	onDelete={async () => {
		await goto(`/${entitiesMap.portfolio.urlName}/${payout.portfolioId}`);
	}}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={payout.breadcrumbs} />
	</svelte:fragment>
</Heading>
