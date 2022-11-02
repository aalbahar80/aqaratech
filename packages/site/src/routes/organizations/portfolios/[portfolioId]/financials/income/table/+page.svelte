<script lang="ts">
	import type { PageData } from './$types';
	import IncomeTable from './IncomeTable.svelte';

	export let data: PageData;
</script>

<IncomeTable {data} />
