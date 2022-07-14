<script lang="ts">
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedExpense } from '$lib/models/interfaces/predefined.interface';
	import { toDateInput } from '$lib/utils/common';
	import { getAddress, getUnitLabel } from '$lib/utils/get-label';
	import { createSchema, updateSchema } from '$models/schemas/expense.schema';
	import type {
		ExpenseDto,
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		PaginatedUnitDto,
	} from '@self/sdk';

	type TPredefinedExpense = $$Generic<PredefinedExpense | undefined>;
	type TPortfolios = $$Generic<PaginatedPortfolioDto | undefined>;
	type TProperties = $$Generic<PaginatedPropertyDto | undefined>;
	type TUnits = $$Generic<PaginatedUnitDto | undefined>;

	type TExpenseDto = $$Generic<
		TPortfolios extends undefined ? ExpenseDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
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
	export let data: TExpenseDto = undefined as TExpenseDto;
	export let predefined: TPredefinedExpense = undefined as TPredefinedExpense;
	export let portfolios: TPortfolios = undefined as TPortfolios;
	export let properties: TProperties = undefined as TProperties;
	export let units: TUnits = undefined as TUnits;

	const relationalFields: SelectField<RelOption>[] =
		formType === 'create'
			? [
					new SelectField('portfolioId', {
						label: 'Portfolio',
						required: true,
						value: data?.portfolioId || predefined?.portfolioId,
						combobox: true,
						autoInit: true,
						options:
							formType === 'create'
								? portfolios!.results.map((portfolio) => ({
										value: portfolio.id,
										label: portfolio.fullName,
								  }))
								: [
										{
											value: data?.breadcrumbs?.portfolio?.id,
											label: data?.breadcrumbs?.portfolio?.label!, // temp
										},
								  ],
					}),
					new SelectField('propertyId', {
						label: 'Property',
						required: true,
						value: data?.propertyId || predefined?.propertyId,
						combobox: true,
						autoInit: true,
						options:
							formType === 'create'
								? properties!.results.map((property) => ({
										value: property.id,
										label: getAddress(property),
										meta: { parentId: property.portfolioId },
								  }))
								: [
										{
											value: data?.breadcrumbs?.property?.id,
											label: data?.breadcrumbs?.property?.label,
										},
								  ],
					}),
					new SelectField('unitId', {
						label: 'Unit',
						required: true,
						value: data?.unitId || predefined?.unitId,
						combobox: true,
						autoInit: true,
						options:
							formType === 'create'
								? units!.results.map((unit) => ({
										value: unit.id,
										label: getUnitLabel(unit),
										meta: { parentId: unit.propertyId },
								  }))
								: [
										{
											value: data?.breadcrumbs?.unit?.id,
											label: data?.breadcrumbs?.unit?.label,
										},
								  ],
					}),
			  ]
			: [];

	const basicFields = [
		new Field('amount', {
			required: true,
			type: 'number',
			value: data?.amount,
		}),
		new Field('postAt', {
			required: true,
			type: 'date',
			value: toDateInput(data?.postAt),
			label: 'Post Date',
		}),
		// new AsyncSelectField('categoryId', {
		// 	required: true,
		// 	getOptions: async () => {
		// 		const data = await trpc().query('public:expenses:meta');
		// 		return getExpenseCategories(data);
		// 	},
		// 	value: data?.categoryId || '',
		// 	label: 'Expense Category',
		// 	selectionLabel: data?.category
		// 		? `${data?.category?.en} - ${data?.category?.ar}`
		// 		: '',
		// }),
		new Field('memo', {
			value: data?.memo,
			hint: 'Enter a short description of the expense. This will be visible to the portfolio user.',
		}),
	];
</script>

<Form
	schema={formType === 'create' ? createSchema : updateSchema}
	entityTitle="expenses"
	{formType}
	{basicFields}
	{relationalFields}
	onCreate={(values) =>
		$page.stuff.api.expenses.create({ createExpenseDto: values })}
	onUpdate={(values) =>
		$page.stuff.api.expenses.update({
			id: data.id,
			updateExpenseDto: values,
		})}
/>
