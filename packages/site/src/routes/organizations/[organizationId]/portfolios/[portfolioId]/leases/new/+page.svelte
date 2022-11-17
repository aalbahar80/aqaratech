<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';
	import { PageType } from '@self/utils';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	const formModel = getEntityFormModel({
		entity: 'lease',
		pageType: PageType.New,
	});
</script>

<EnhancedForm {formModel} {form} data={data.predefined} />
