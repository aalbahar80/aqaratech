<script lang="ts">
	import * as R from 'remeda';

	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;

	$: obj = R.merge(data.lease, {
		tenant: data.lease.breadcrumbs.tenant.label,
	});

	const ALL_KEYS = [
		'tenant',
		'start',
		'end',
		'monthlyRent',
		'deposit',
		'license',
		'notify',
		'canPay',
	] as const;

	$: keys =
		$page.data.user?.role?.roleType === 'TENANT'
			? ALL_KEYS.filter((key) => !['canPay', 'notify', 'license'].includes(key))
			: ALL_KEYS;
</script>

<AutoDetailsPane
	details={obj}
	{keys}
/>
