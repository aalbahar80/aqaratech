<script context="module" lang="ts">
	import { page } from '$app/stores';
	import FormTWF from '$components/form/FormTWF.svelte';
	import defs, { type EntityDefinitions } from '$lib/definitions/index';
</script>

<script lang="ts">
	const entityDefs: EntityDefinitions =
		defs?.[$page.params.entity as keyof typeof defs];
</script>

<FormTWF
	formData={entityDefs?.defaultForm}
	formSchema={entityDefs?.formSchema}
	transformer={entityDefs?.transformer}
/>
