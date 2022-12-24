<script lang="ts">
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import MaintenanceOrderPage from '$lib/components/maintenance-order/MaintenanceOrderPage.svelte';

	export let data: PageData;
</script>

<MaintenanceOrderPage maintenanceOrder={data.maintenanceOrder} />

<AutoDetailsPane
	details={data.maintenanceOrder}
	keys={['title', 'description', 'status', 'completedAt']}
/>
