<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import DataTabs from '../DataTabs.svelte';
	import type { PageData } from './$types';
	import StatsIncome from './StatsIncome.svelte';

	export let data: PageData;
</script>

<div class="inline-flex justify-end">
	<div class="w-72">
		<RangeSelect />
	</div>
</div>

<StatsIncome {data} />

<DataTabs dataType="income" />

<slot />
