<script lang="ts">
	import type { PageData } from './$types';

	import PropertyTable from '$lib/components/property/PropertyTable.svelte';

	export let data: PageData;
</script>

<PropertyTable data={data.properties} />
