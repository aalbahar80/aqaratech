<script lang="ts">
	import FormC from '$components/form/FormC.svelte';
	import ref from '$lib/definitions/ref';
	import { page } from '$app/stores';
	const entity = $page.params.entity;
	const { docs, fieldList } = ref[entity];
</script>

<FormC {fieldList} {entity} insertDoc={docs.insert} />
