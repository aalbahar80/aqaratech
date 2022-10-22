<script lang="ts">
	import { createApi } from '$api';
	import type {
		ExpenseCategoryDto,
		ExpenseDto,
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		PaginatedUnitDto,
	} from '$api/openapi';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import {
		portfoliosToOptions,
		propertiesToOptions,
		unitsToOptions,
	} from '$lib/components/form/inputs/to-options';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedExpense } from '$lib/models/interfaces/predefined.interface';
	import { toOptions } from '$lib/utils/expense-type-options';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import { expenseCreateSchema, expenseUpdateSchema } from '@self/utils';

	type TPredefinedExpense = $$Generic<PredefinedExpense | undefined>;
	type TPortfolios = $$Generic<PaginatedPortfolioDto | undefined>;
	type TProperties = $$Generic<PaginatedPropertyDto | undefined>;
	type TUnits = $$Generic<PaginatedUnitDto | undefined>;

	type TExpenseDto = $$Generic<
		TPortfolios extends undefined ? ExpenseDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
		expenseTypes: ExpenseCategoryDto[];
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TExpenseDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
		predefined: TPredefinedExpense;
		portfolios: TPortfolios;
		properties: TProperties;
		units: TUnits;
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let expenseTypes: $$Props['expenseTypes'];
	export let data: TExpenseDto = undefined as TExpenseDto;
	export let predefined: TPredefinedExpense = undefined as TPredefinedExpense;
	export let portfolios: TPortfolios = undefined as TPortfolios;
	export let properties: TProperties = undefined as TProperties;
	export let units: TUnits = undefined as TUnits;

	const relationalFields: SelectField<RelOption>[] =
		formType === 'create' && portfolios
			? [
					new SelectField('portfolioId', {
						label: 'Portfolio',
						required: true,
						value: predefined?.portfolioId,
						combobox: true,
						autoInit: true,
						options: portfoliosToOptions(portfolios),
					}),
					new SelectField('propertyId', {
						label: 'Property',
						required: true,
						value: predefined?.propertyId,
						combobox: true,
						autoInit: true,
						options: properties ? propertiesToOptions(properties) : undefined,
					}),
					new SelectField('unitId', {
						label: 'Unit',
						required: true,
						value: predefined?.unitId,
						combobox: true,
						autoInit: true,
						options: units ? unitsToOptions(units) : undefined,
					}),
			  ]
			: [];

	const basicFields = [
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
		new Field('amount', {
			required: true,
			type: 'number',
			value: data?.amount,
		}),
		new Field('postAt', {
			required: true,
			type: 'date',
			value: data?.postAt.split('T')[0],
			label: 'Post Date',
		}),
		new SelectField('categoryId', {
			options: toOptions(expenseTypes),
			value: data?.categoryId || '',
			combobox: true,
			autoInit: true,
			label: 'Expense Category',
		}),
		new Field('memo', {
			value: data?.memo,
			hint: 'Enter a short description of the expense. This will be visible to the portfolio user.',
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={expenseUpdateSchema}
		entity="expense"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			createApi().expenses.update({
				id: data.id,
				updateExpenseDto: values,
			})}
	/>
{:else}
	<Form
		schema={expenseCreateSchema}
		entity="expense"
		{formType}
		{basicFields}
		{relationalFields}
		onSubmit={(values) =>
			createApi().organizations.createExpense({
				createExpenseDto: values,
				organizationId: $page.data.user?.role?.organizationId,
			})}
	/>
{/if}
