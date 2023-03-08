<script lang="ts">
	import * as R from 'remeda';

	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;

	$: obj = R.merge(data.organization, {
		// n months n days
		dueDurationMonths: `${
			data.organization.settings?.dueDuration.months ?? ''
		}`,
		dueDurationDays: `${data.organization.settings?.dueDuration.days ?? ''}`,
	});
</script>

<AutoDetailsPane
	details={obj}
	keys={['fullName', 'label', 'dueDurationMonths', 'dueDurationDays']}
/>
