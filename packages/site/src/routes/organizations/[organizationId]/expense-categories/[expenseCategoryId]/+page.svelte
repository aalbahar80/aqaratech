<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';

	import type { PageData } from './$types';

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
