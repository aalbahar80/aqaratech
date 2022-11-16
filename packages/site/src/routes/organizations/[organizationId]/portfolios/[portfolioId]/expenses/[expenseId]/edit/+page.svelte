<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { getEntityFormModel } from '$lib/components/form/model/get-entity-form-model';
	import {
		key,
		type ExpenseCategoryContext,
	} from '$lib/components/organization/expense-category-context';
	import { toOptions } from '$lib/utils/expense-type-options';
	import { PageType } from '@self/utils';
	import { setContext } from 'svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	setContext<ExpenseCategoryContext>(key, {
		data: toOptions(data.categories),
	});

	const formModel = getEntityFormModel({
		entity: 'expense',
		pageType: PageType.Edit,
	});
</script>

<EnhancedForm {form} {formModel} data={data.expense} />
