<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	import StatsIncome from './StatsIncome.svelte';

	import LinkData from '$lib/components/dashboard/LinkData.svelte';

	export let data: LayoutData;
</script>

<!-- Remove when stats are shown in pie charts (EXE-41) -->
{#if $page.route.id?.endsWith('table')}
	<StatsIncome {data} />
{/if}

<slot />

<LinkData dataType="Income" />
