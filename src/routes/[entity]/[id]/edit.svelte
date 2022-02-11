<script context="module" lang="ts">
	import { page } from '$app/stores';
	import FormTWF from '$components/form/FormTWF.svelte';
	import defs from '$lib/definitions/index';
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
</script>

<FormTWF {formData} formSchema={defs?.[$page.params.entity].formSchema} />
