<script lang="ts">
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';

	export let data: PageData;
</script>

<Heading
	title="Expense Category"
	id={data.expenseCategory.id}
	entity="expenseCategory"
/>

<AutoDetailsPane
	details={data.expenseCategory}
	keys={['labelEn', 'labelAr', 'isGroup']}
/>
