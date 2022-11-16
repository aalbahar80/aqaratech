<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import ExpensePage from '$lib/components/expense/ExpensePage.svelte';
	import * as R from 'remeda';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExpensePage expense={data.expense} />

<AutoDetailsPane
	details={R.mapValues(data.expense, (v, k) => {
		if (k === 'expenseType' && v && typeof v === 'object' && 'labelEn' in v) {
			return v.labelEn;
		} else {
			return v;
		}
	})}
	keys={['postAt', 'amount', 'expenseType', 'memo']}
/>
