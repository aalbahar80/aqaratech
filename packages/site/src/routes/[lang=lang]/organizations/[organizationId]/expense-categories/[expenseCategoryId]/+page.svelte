<script lang="ts">
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';

	export let data: PageData;
</script>

<Heading
	title={$L.entity.expenseCategory.singular()}
	id={data.expenseCategory.id}
	entity="expenseCategory"
/>

<AutoDetailsPane
	details={data.expenseCategory}
	keys={['labelEn', 'labelAr', 'isGroup']}
/>
