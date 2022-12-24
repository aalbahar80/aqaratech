<script lang="ts">
	import type { PageData } from './$types';

	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';

	export let data: PageData;
</script>

<LeaseTable data={data.leases} />
