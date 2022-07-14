<script lang="ts">
	import { page } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { unitTypeOptions } from '$lib/config/constants';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
	import { getAddress, getUnitLabel } from '$lib/utils/get-label';
	import { createSchema, updateSchema } from '$models/schemas/unit.schema.js';
	import type {
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		UnitDto,
	} from '@self/sdk';

	type TPredefinedUnit = $$Generic<PredefinedUnit | undefined>;
	type TPortfolios = $$Generic<PaginatedPortfolioDto | undefined>;
	type TProperties = $$Generic<PaginatedPropertyDto | undefined>;

	type TUnitDto = $$Generic<
		TPortfolios extends undefined ? UnitDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TUnitDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
		predefined: TPredefinedUnit;
		portfolios: TPortfolios;
		properties: TProperties;
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TUnitDto = undefined as TUnitDto;
	export let predefined: TPredefinedUnit = undefined as TPredefinedUnit;
	export let portfolios: TPortfolios = undefined as TPortfolios;
	export let properties: TProperties = undefined as TProperties;

	const relationalFields: SelectField<RelOption>[] =
		formType === 'create'
			? [
					new SelectField('portfolioId', {
						label: 'Portfolio',
						required: true,
						value: data?.breadcrumbs?.portfolio.id || predefined?.portfolioId,
						combobox: true,
						disabled: formType === 'update',
						options:
							formType === 'create'
								? portfolios!.results.map((portfolio) => ({
										value: portfolio.id,
										label: portfolio.fullName,
								  }))
								: [
										{
											value: data?.breadcrumbs?.portfolio.id,
											label: data?.breadcrumbs?.portfolio.label!, // temp
										},
								  ],
					}),
					new SelectField('propertyId', {
						label: 'Property',
						required: true,
						value: data?.propertyId || predefined?.propertyId,
						combobox: true,
						disabled: formType === 'update',
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
											value: data!.propertyId,
											label: data?.breadcrumbs?.property.label,
										},
								  ],
					}),
			  ]
			: [];

	const basicFields = [
		new SelectField('type', {
			value: data?.type,
			options: unitTypeOptions,
			autoInit: true,
		}),
		new Field('unitNumber', { required: true, value: data?.unitNumber }),
		new Field('bed', { type: 'number', value: data?.bed }),
		new Field('bath', { type: 'number', value: data?.bath }),
		new Field('size', { type: 'number', value: data?.size }),
		new Field('marketRent', { type: 'number', value: data?.marketRent }),
		new Field('floor', { type: 'number', value: data?.floor }),
		new Field('usage', { value: data?.usage }),
	];
</script>

<Form2
	schema={formType === 'create' ? createSchema : updateSchema}
	entityTitle="units"
	{formType}
	{basicFields}
	{relationalFields}
	onCreate={(values) => $page.stuff.api.units.create({ createUnitDto: values })}
	onUpdate={(values) =>
		$page.stuff.api.units.update({
			id: data.id,
			updateUnitDto: values,
		})}
/>
