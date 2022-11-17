<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import PayoutPage from '$lib/components/payout/PayoutPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PayoutPage payout={data.payout} />

<AutoDetailsPane details={data.payout} keys={['postAt', 'amount', 'memo']} />
