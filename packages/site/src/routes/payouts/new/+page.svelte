<script lang="ts">
	import PayoutForm from '$lib/components/payout/PayoutForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PayoutForm predefined={data.predefined} />
