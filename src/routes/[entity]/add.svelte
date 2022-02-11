<script context="module" lang="ts">
	import { page } from '$app/stores';
	import FormTWF from '$components/form/FormTWF.svelte';
	import defs from '$lib/definitions/index';
</script>

<FormTWF
	formData={defs?.[$page.params.entity].defaultForm}
	formSchema={defs?.[$page.params.entity].formSchema}
/>
