<script lang="ts">
	import PropertyTable from '$lib/components/property/PropertyTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PropertyTable data={data.properties} />
