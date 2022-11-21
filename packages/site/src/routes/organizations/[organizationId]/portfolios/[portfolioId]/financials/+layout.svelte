<script lang="ts">
	import { page } from '$app/stores';
	import PropertySelect from '$lib/components/dashboard/PropertySelect.svelte';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const hideRange = ['financials/summary', 'payouts/table'];
</script>

{#if !hideRange.some((str) => $page.url.pathname.endsWith(str))}
	<div class="inline-flex justify-end">
		<div class="w-72">
			<RangeSelect />
		</div>
	</div>
{/if}

<div class="inline-flex justify-end">
	<div class="w-72">
		<PropertySelect properties={data.properties.results} />
	</div>
</div>

<slot />
