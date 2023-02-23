<script lang="ts">
	import * as R from 'remeda';

	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import { getMaintenanceOrderLabels } from '$lib/constants/maintenance-status-options';

	export let data: PageData;

	$: obj = R.merge(data.maintenanceOrder, {
		status: getMaintenanceOrderLabels()[data.maintenanceOrder.status],
	});
</script>

<AutoDetailsPane
	details={obj}
	keys={['title', 'description', 'status', 'completedAt']}
/>
