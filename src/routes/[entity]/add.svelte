<script lang="ts">
	import AddC from '$components/AddC.svelte';
	import ref from '$lib/definitions/ref';
	import { page } from '$app/stores';
	const entity = $page.params.entity;
	const { docs, fieldList } = ref[entity];
</script>

<AddC {fieldList} {entity} insertDoc={docs.insert} />
