<script lang="ts">
	import PropertyForm from '$lib/components/property/PropertyForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PropertyForm formType="update" data={data.property} />
