<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { addSuccessToast } from '$lib/stores/toast';
	import { settings } from '$lib/utils/route-helpers';
	import {
		createSchema,
		updateSchema,
	} from '$models/schemas/expenseCategory.schema';
	import type { ExpenseCategoryDto } from '@self/sdk';

	type TExpenseCategoryDto = $$Generic<
		TExpenseCategorys extends undefined ? ExpenseCategoryDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TExpenseCategoryDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TExpenseCategoryDto = undefined as TExpenseCategoryDto;

	const basicFields = [
		new Field('labelEn', {
			required: true,
			value: data?.labelEn,
			label: 'Name (english)',
		}),
		new Field('labelAr', {
			value: data?.labelAr,
			label: 'Name (arabic)',
		}),
		...(formType === 'create'
			? [
					new Field('isGroup', {
						label: 'Create as group?',
						type: 'checkbox',
						value: data?.isGroup ?? false,
						autoInit: true,
						hint: 'You can either create an expense group OR an expense category. \n\n Expense Group: Can contain multiple expense categories. Example: "Utilities" expense group can have two expense categories called "Water" and "Electricity". Groups can be deeply nested. \n\n Expense Category: Holds expense entries.',
					}),
			  ]
			: []),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={updateSchema}
		entity="expenseCategory"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			const expenseCategoryId = $page.params.expenseCategoryId;
			if (!expenseCategoryId) {
				throw new Error('expenseCategoryId not found');
			}
			return api($page.data.apiConfig).expenseCategories.update({
				id: expenseCategoryId,
				updateExpenseCategoryDto: { ...values, id: expenseCategoryId },
			});
		}}
		onSuccess={(value) => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organizationId not found');
			}
			addSuccessToast();
			return goto(settings(organizationId).tree + '#' + value);
		}}
	/>
{:else}
	<Form
		schema={createSchema}
		entity="expenseCategory"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			api($page.data.apiConfig).expenseCategories.create({
				createExpenseCategoryDto: { ...values, parentId: null },
			})}
		onSuccess={(value) => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organiztionId not found');
			}
			addSuccessToast();
			return goto(settings(organizationId).tree + '#' + value);
		}}
	/>
{/if}
