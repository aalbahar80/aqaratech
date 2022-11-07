<script lang="ts">
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PropertyList properties={data.properties} />
