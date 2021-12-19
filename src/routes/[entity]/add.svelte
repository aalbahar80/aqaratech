<script lang="ts">
	import AddGeneric from '$components/AddGeneric.svelte';
	import ref from '$lib/definitions/ref';
	import { page } from '$app/stores';
	const entity = $page.params.entity;
	const { docs, fieldList } = ref[entity];
</script>

<AddGeneric {fieldList} {entity} insertDoc={docs.insert} />
