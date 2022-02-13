<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import defs, { type EntityDefinitions } from '$lib/definitions/index';
</script>

<script lang="ts">
	const entityDefs: EntityDefinitions =
		defs?.[$page.params.entity as keyof typeof defs];
</script>

<Form
	formData={entityDefs?.defaultForm}
	formSchema={entityDefs?.formSchema}
	transformer={entityDefs?.transformer}
/>
