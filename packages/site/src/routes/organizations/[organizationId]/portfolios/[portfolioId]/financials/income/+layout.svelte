<script lang="ts">
	import DataTabs from '../DataTabs.svelte';
	import type { LayoutData } from './$types';
	import StatsIncome from './StatsIncome.svelte';

	export let data: LayoutData;
</script>

<DataTabs dataType="Income" />

<StatsIncome {data} />

<slot />
