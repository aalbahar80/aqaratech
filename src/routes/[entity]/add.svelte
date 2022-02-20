<script context="module" lang="ts">
	import { page } from '$app/stores';
	import FormGeneric from '$components/form/FormGeneric.svelte';
	import defs, { type EntityDefinitions } from '$lib/definitions/index';
</script>

<script lang="ts">
	const entityDefs: EntityDefinitions =
		defs?.[$page.params.entity as keyof typeof defs];
</script>

<FormGeneric formData={entityDefs.defaultForm()} />
