<script lang="ts">
	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LeaseTable data={data.leases} />
