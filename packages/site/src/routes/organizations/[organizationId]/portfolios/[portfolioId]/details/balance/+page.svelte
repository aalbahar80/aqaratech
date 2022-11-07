<script lang="ts">
	import BalanceCard from '$lib/components/balance/BalanceCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<BalanceCard balance={data.balance} />
