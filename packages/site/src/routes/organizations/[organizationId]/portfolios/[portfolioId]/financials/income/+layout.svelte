<script lang="ts">
	import DataTabs from '../DataTabs.svelte';
	import type { LayoutData } from './$types';
	import StatsIncome from './StatsIncome.svelte';

	export let data: LayoutData;
</script>

<StatsIncome {data} />

<DataTabs dataType="Income" />

<slot />
