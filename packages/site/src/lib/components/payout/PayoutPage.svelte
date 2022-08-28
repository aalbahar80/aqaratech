<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { PayoutDto } from '@self/sdk';

	export let payout: PayoutDto;
</script>

<Heading title="Payout" id={payout.id} entity="payout">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={payout.breadcrumbs} />
	</svelte:fragment>
</Heading>
