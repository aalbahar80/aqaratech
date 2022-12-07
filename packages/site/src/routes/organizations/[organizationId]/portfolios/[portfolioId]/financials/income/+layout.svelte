<script lang="ts">
	import StatsIncome from './StatsIncome.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<StatsIncome {data} />

<slot />
