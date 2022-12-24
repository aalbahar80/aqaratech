<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { setContext } from 'svelte';

	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';
	import {
		key,
		type ExpenseCategoryContext,
	} from '$lib/components/organization/expense-category-context';
	import { toOptions } from '$lib/utils/expense-type-options';

	export let data: PageData;

	setContext<ExpenseCategoryContext>(key, {
		data: toOptions(data.categories),
	});

	export let form: ActionData;

	const formModel = getEntityFormModel({
		entity: 'expense',
	});
</script>

<EnhancedForm {formModel} {form} />
