<script context="module" lang="ts">
	import { formSchema, type TenantData } from '$lib/definitions/Tenants';
	import FormTWF from '$components/form/FormTWF.svelte';
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch, params }) => {
		const { id } = params;
		const res = await fetch(`/tenants/${id}.json`);
		const formData = await res.json();
		return {
			props: { formData },
		};
	};
</script>

<script lang="ts">
	export let formData: TenantData;
</script>

<FormTWF {formData} {formSchema} />
