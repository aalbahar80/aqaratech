<script lang="ts">
	import * as R from 'remeda';

	import type { PageData } from './$types';

	import { locale } from '$i18n/i18n-svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;

	$: obj = R.merge(data.expense, {
		category:
			($locale === 'ar' && data.expense.expenseType?.labelAr) ||
			data.expense.expenseType?.labelEn,
	});
</script>

<AutoDetailsPane
	details={obj}
	keys={['postAt', 'amount', 'category', 'memo']}
/>
