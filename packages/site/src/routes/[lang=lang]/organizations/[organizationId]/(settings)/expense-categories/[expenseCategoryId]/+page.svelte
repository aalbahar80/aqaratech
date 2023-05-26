<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { getRoute, PageType } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import Heading from '$lib/components/Heading.svelte';

	export let data: PageData;
</script>

<Heading
	title={$L.entity.expenseCategory.singular()}
	id={data.expenseCategory.id}
	entity="expenseCategory"
/>

<TextButton>
	<a
		href={getRoute({
			entity: 'expenseCategory',
			pageType: PageType.List,
			params: $page.params,
		})}
	>
		{$L.buttons.view()}
		{$L.general.all()}
		<Arrow />
	</a>
</TextButton>

<AutoDetailsPane
	details={data.expenseCategory}
	keys={['labelEn', 'labelAr', 'isGroup']}
/>
