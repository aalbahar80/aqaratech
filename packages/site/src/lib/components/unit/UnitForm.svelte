<script lang="ts">
	import { page, session } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
	import { getAddress, getUnitLabel } from '$lib/utils/get-label';
	import { schema } from '$models/schemas/unit.schema.js';
	import type {
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		UnitDto,
	} from '@self/sdk';

	// export let data: UnitDto | undefined = undefined;
	// export let portfolios: PaginatedPortfolioDto;
	// export let properties: PaginatedPropertyDto;
	// export let predefined: PredefinedUnit | undefined = undefined;
	// export let formType: 'create' | 'update';

	// we need to use two generic types
	// on the first we say it is either from some type (`string`) or `undefined`
	// type Title = $$Generic<string | undefined>;
	type TPredefinedUnit = $$Generic<PredefinedUnit | undefined>;
	type TPortfolios = $$Generic<PaginatedPortfolioDto>;
	type TProperties = $$Generic<PaginatedPropertyDto>;
	// for the second generic type we use a conditional type and assign it
	// either to some type (`string`) if the other type is `undefined`
	// or to `undefined` if the other type is defined
	// type Label = $$Generic<Title extends undefined ? string : undefined>;
	type TUnitDto = $$Generic<
		TPredefinedUnit extends undefined ? UnitDto : undefined
	>;

	// define the props this component always has
	interface Props {
		name: string;
	}

	// define the props this component can have in variant A (update)
	interface WithLabel extends Props {
		// label: Label
		data: TUnitDto;
	}

	// define the props this component can have in variant B (create)
	interface WithTitle extends Props {
		// title: Title
		predefined: TPredefinedUnit;
		portfolios: TPortfolios;
		properties: TProperties;
	}

	// combine both variants via an union type
	type $$Props = WithLabel | WithTitle;

	export let name: string;
	// we need to cast `undefined` to the variable we haave specified
	// export let label: Label = undefined as Label;
	export let data: TUnitDto = undefined as TUnitDto;
	// export let title: Title = undefined as Title;
	export let predefined: TPredefinedUnit = undefined as TPredefinedUnit;

	const basicFields = [
		new SelectField('portfolioId', {
			label: 'Portfolio',
			required: true,
			value: data?.breadcrumbs?.portfolio.id || predefined?.portfolioId,
			combobox: true,
			disabled: formType === 'update',
			options:
				formType === 'create'
					? portfolios.results.map((portfolio) => ({
							value: portfolio.id,
							label: portfolio.fullName,
					  }))
					: [
							{
								value: data?.breadcrumbs?.portfolio.id,
								label: data?.breadcrumbs?.portfolio.label,
							},
					  ],
		}),
		new SelectField('propertyId', {
			label: 'Property',
			required: true,
			value: data?.propertyId || predefined?.propertyId,
			combobox: true,
			disabled: formType === 'update',
			options:
				formType === 'create'
					? properties.results.map((property) => ({
							value: property.id,
							label: getAddress(property),
					  }))
					: [{ value: data?.propertyId, label: getUnitLabel(data) }],
		}),
		// new SelectField('type', {
		// 	value: data?.type,
		// 	options: unitTypeOptions,
		// }),
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
	schema={formType === 'create' ? schema : schema.omit({ portfolioId: true })}
	entityTitle="units"
	{formType}
	{basicFields}
	onCreate={(values) => $page.stuff.api.units.create({ createUnitDto: values })}
	onUpdate={(values) =>
		$page.stuff.api.units.update({
			id: data.id,
			updateUnitDto: values,
		})}
/>
