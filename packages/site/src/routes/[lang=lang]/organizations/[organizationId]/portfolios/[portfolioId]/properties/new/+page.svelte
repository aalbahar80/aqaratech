<script lang="ts">
	import type { ActionData } from './$types';

	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';

	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'property',
	});
</script>

<EnhancedForm
	{formModel}
	{form}
/>
