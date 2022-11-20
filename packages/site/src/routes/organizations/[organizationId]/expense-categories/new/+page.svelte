<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';

	import type { ActionData } from './$types';

	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'expenseCategory',
	});
</script>

<EnhancedForm {formModel} {form} />
