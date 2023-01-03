<script lang="ts">
	import * as R from 'remeda';

	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;

	$: obj = R.merge(data.lease, {
		tenant: data.lease.breadcrumbs.tenant.label,
	});
</script>

<AutoDetailsPane
	details={obj}
	keys={[
		'tenant',
		'start',
		'end',
		'monthlyRent',
		'deposit',
		'license',
		'notify',
		'canPay',
	]}
/>
