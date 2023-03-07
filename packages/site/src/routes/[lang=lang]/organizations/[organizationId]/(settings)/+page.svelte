<script lang="ts">
	import * as R from 'remeda';

	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;

	$: obj = R.merge(data.organization, {
		// n months n days
		dueDuration: `${
			data.organization.settings?.dueDuration.months ?? ''
		} months ${data.organization.settings?.dueDuration.days ?? ''} days`,
	});
</script>

<AutoDetailsPane
	details={obj}
	keys={['fullName', 'label', 'dueDuration']}
/>
