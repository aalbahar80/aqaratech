<script lang="ts">
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import PayoutPage from '$lib/components/payout/PayoutPage.svelte';

	export let data: PageData;
</script>

<PayoutPage payout={data.payout} />

<AutoDetailsPane details={data.payout} keys={['postAt', 'amount', 'memo']} />
