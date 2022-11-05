<script lang="ts">
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import type { PageData } from './types';

	export let data: PageData;
</script>

<LeaseList leases={data.leases} showIndex />
