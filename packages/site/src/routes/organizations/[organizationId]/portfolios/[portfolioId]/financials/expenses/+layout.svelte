<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import DataTabs from '../DataTabs.svelte';
	import type { PageData } from './$types';
	import StatsExpenses from './StatsExpenses.svelte';

	export let data: PageData;
</script>

<div class="inline-flex justify-end">
	<div class="w-72">
		<RangeSelect />
	</div>
</div>

<StatsExpenses {data} />

<DataTabs dataType="expenses" />

<slot />
