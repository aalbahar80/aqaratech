<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { addSuccessToast } from '$lib/stores/toast';
	import { expenseTreeRoute } from '$lib/utils/route-helpers';
	import { schema } from '$models/schemas/expenseCategory.schema';
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
			value: data?.labelEn,
			label: 'Name (arabic)',
		}),
		new Field('isGroup', {
			label: 'TODO',
			type: 'checkbox',
			value: data?.isGroup ?? false,
			autoInit: true,
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		{schema}
		entityTitle="expenseCategories"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			const expenseCategoryId = $page.params.expenseCategoryId;
			if (!expenseCategoryId) {
				throw new Error('expenseCategoryId not found');
			}
			return $page.stuff.api.expenseCategories.update({
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
			return goto(expenseTreeRoute(organizationId) + '#' + value);
		}}
	/>
{:else}
	<Form
		{schema}
		entityTitle="expenseCategories"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			$page.stuff.api.expenseCategories.create({
				createExpenseCategoryDto: { ...values, parentId: null },
			})}
		onSuccess={() => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organiztionId not found');
			}
			addSuccessToast();
			return goto(expenseTreeRoute(organizationId));
		}}
	/>
{/if}
