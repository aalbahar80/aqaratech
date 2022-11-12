<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';
	import { PageType } from '@self/utils';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'portfolio',
		pageType: PageType.New,
	});
</script>

<EnhancedForm {formModel} {form} />
