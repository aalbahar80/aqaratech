<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import MaintenanceOrderPage from '$lib/components/maintenance-order/MaintenanceOrderPage.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MaintenanceOrderPage maintenanceOrder={data.maintenanceOrder} />

<AutoDetailsPane
	details={data.maintenanceOrder}
	keys={['completedAt', 'title', 'description', 'status']}
/>
