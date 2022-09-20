<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import { portfoliosToOptions } from '$lib/components/form/inputs/to-options';
	import { areas } from '$lib/constants/areas-kwt';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedProperty } from '$lib/models/interfaces/predefined.interface';
	import {
		createSchema,
		updateSchema,
	} from '$lib/models/schemas/property.schema';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import type { PaginatedPortfolioDto, PropertyDto } from '@self/sdk';

	type TPredefinedProperty = $$Generic<PredefinedProperty | undefined>;
	type TPortfolios = $$Generic<PaginatedPortfolioDto | undefined>;

	type TPropertyDto = $$Generic<
		TPortfolios extends undefined ? PropertyDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TPropertyDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
		predefined: TPredefinedProperty;
		portfolios: TPortfolios;
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TPropertyDto = undefined as TPropertyDto;
	export let predefined: TPredefinedProperty = undefined as TPredefinedProperty;
	export let portfolios: TPortfolios = undefined as TPortfolios;

	const relationalFields: SelectField<RelOption>[] =
		formType === 'create' && portfolios
			? [
					new SelectField('portfolioId', {
						label: 'Portfolio',
						required: true,
						value: data?.breadcrumbs?.portfolio.id || predefined?.portfolioId,
						autoInit: true,
						combobox: true,
						options: portfoliosToOptions(portfolios),
					}),
			  ]
			: [];

	const basicFields = [
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
		new SelectField('area', {
			required: true,
			value: data?.area,
			combobox: true,
			autoInit: true,
			options: areas.map((area) => ({
				value: area[1],
				label: `${area[0]} | ${area[1]}`,
			})),
		}),
		new Field('block', { required: true, value: data?.block }),
		new Field('avenue', { value: data?.avenue }),
		new Field('street', { required: true, value: data?.street }),
		new Field('number', { required: true, value: data?.number }),
		new Field('parcel', {
			required: false,
			value: data?.parcel,
			hint: 'رقم القسيمة',
		}),
		new Field('paci', {
			required: false,
			value: data?.paci,
			hint: 'الرقم الآلي للعنوان',
		}),
		new Field('label', {
			value: data?.label,
			hint: labelHint,
		}),
		// new Field('label', {
		// 	required: false,
		// 	value: data?.label,
		// 	// TODO placeholder to show inferred label?
		// 	hint: 'What should we call this property? If you wish, provide a short user-friendly name for this property to use whenever we need to refer to it, otherwise an automatic label will be used by combining the `area` and `block` fields.\n\nCan be changed at any time.',
		// }),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={updateSchema}
		entity="property"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data &&
			api($page.data.apiConfig).properties.update({
				id: data.id,
				updatePropertyDto: values,
			})}
	/>
{:else}
	<Form
		schema={createSchema}
		entity="property"
		{formType}
		{basicFields}
		{relationalFields}
		onSubmit={(values) =>
			api($page.data.apiConfig).properties.create({
				createPropertyDto: values,
			})}
	/>
{/if}
