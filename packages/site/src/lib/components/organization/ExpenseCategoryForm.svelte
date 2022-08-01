<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { addSuccessToast } from '$lib/stores/toast';
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
	<!-- TODO wire up new updateExpenseCategory endpoint -->
	<!-- <Form
		{schema}
		entityTitle="expenseCategories"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organiztionId not found');
			}
			return $page.stuff.api.organizations.createExpenseCategory({
				id: organizationId,
				createExpenseCategoryDto: {
					labelEn: new Date().toISOString(),
					parentId: null,
					isGroup: false,
				},
			});
		}}
		onSuccess={(value) => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organiztionId not found');
			}
			addSuccessToast();
			return goto(`/organizations/${organizationId}/expense-categories`);
		}}
	/> -->
{:else}
	<Form
		{schema}
		entityTitle="expenseCategories"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organiztionId not found');
			}
			return $page.stuff.api.organizations.createExpenseCategory({
				id: organizationId,
				createExpenseCategoryDto: {
					labelEn: new Date().toISOString(),
					parentId: null,
					isGroup: false,
				},
			});
		}}
		onSuccess={(value) => {
			const organizationId = $page.params.id;
			if (!organizationId) {
				throw new Error('organiztionId not found');
			}
			addSuccessToast();
			return goto(`/organizations/${organizationId}/expense-categories`);
		}}
	/>
{/if}
