<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';

	export let form: ActionData;
	export let data: PageData;

	const formModel = getEntityFormModel({
		entity: 'lease',
	});
</script>

<EnhancedForm {formModel} {form} data={data.predefined} />
