<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import {
		portfoliosToOptions,
		propertiesToOptions,
	} from '$lib/components/form/inputs/to-options';
	import { labelHint } from '$lib/constants/form-hints';
	import { unitTypeOptions } from '$lib/constants/unit-options';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import { createSchema, updateSchema } from '$models/schemas/unit.schema';
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
			  ]
			: [];

	const basicFields = [
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
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
		new Field('label', {
			value: data?.label,
			hint: labelHint,
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={updateSchema}
		entity="unit"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data &&
			api($page.data.apiConfig).units.update({
				id: data.id,
				updateUnitDto: values,
			})}
	/>
{:else}
	<Form
		schema={createSchema}
		entity="unit"
		{formType}
		{basicFields}
		{relationalFields}
		onSubmit={(values) =>
			api($page.data.apiConfig).units.create({ createUnitDto: values })}
	/>
{/if}
