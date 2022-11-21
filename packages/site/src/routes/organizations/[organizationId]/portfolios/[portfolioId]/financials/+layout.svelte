<script lang="ts">
	import { page } from '$app/stores';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';

	const hideRange = ['financials/summary', 'payouts/table'];
</script>

{#if !hideRange.some((str) => $page.url.pathname.endsWith(str))}
	<div class="inline-flex justify-end">
		<div class="w-72">
			<RangeSelect />
		</div>
	</div>
{/if}

<slot />
