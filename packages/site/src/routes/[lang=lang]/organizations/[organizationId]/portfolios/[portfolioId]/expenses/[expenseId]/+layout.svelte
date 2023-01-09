<script lang="ts">
	import type { LayoutData } from './$types';

	import ExpensePage from '$lib/components/expense/ExpensePage.svelte';
	import ExpenseTabs from '$lib/components/expense/ExpenseTabs.svelte';

	export let data: LayoutData;
</script>

<ExpensePage expense={data.expense} />

<ExpenseTabs />

<slot />
