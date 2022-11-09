<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/get-entity-form-model';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const formModel = getEntityFormModel('portfolio');
</script>

<EnhancedForm {form} {formModel} data={data.portfolio} />
