<script lang="ts">
	import IncomeTable from 'src/routes/portfolios/[id]/financials/income/table/IncomeTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<IncomeTable {data} />
