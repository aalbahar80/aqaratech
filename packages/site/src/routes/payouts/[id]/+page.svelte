<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import PayoutPage from '$lib/components/payout/PayoutPage.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		['Post Date', toUTCFormat(data.payout.postAt)],
		['Amount', kwdFormat(data.payout.amount)],
		['Memo', data.payout.memo],
	] as [string, string | null][];
</script>

<PayoutPage payout={data.payout} />
<DetailsPane {details} />
