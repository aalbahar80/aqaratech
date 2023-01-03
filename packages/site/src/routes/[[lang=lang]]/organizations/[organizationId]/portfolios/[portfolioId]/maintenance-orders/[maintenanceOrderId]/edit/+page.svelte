<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';

	export let data: PageData;
	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'maintenanceOrder',
	});
</script>

<EnhancedForm {form} {formModel} data={data.maintenanceOrder} />
