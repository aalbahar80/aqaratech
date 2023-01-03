<script lang="ts">
	import type { PageData } from './$types';

	import BalanceCard from '$lib/components/balance/BalanceCard.svelte';

	export let data: PageData;
</script>

<BalanceCard balance={data.balance} />
