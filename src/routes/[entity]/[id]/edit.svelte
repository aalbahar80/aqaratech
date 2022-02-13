<script context="module" lang="ts">
	import { page } from '$app/stores';
	import FormTWF from '$components/form/FormTWF.svelte';
	import defs, { type EntityDefinitions } from '$lib/definitions/index';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const { entity, id } = params;
		const res = await fetch(`/${entity}/${id}.json`);
		const formData = await res.json();
		return {
			props: { formData },
		};
	};
</script>

<script lang="ts">
	export let formData: any;
	const entityDefs: EntityDefinitions =
		defs?.[$page.params.entity as keyof typeof defs];
</script>

<FormTWF
	{formData}
	formSchema={entityDefs.formSchema}
	transformer={entityDefs.transformer}
/>
