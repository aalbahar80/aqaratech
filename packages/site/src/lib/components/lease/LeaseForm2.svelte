<script lang="ts">
	import { page } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedLease } from '$lib/models/interfaces/predefined.interface';
	import { getUnitLabel, toDateInput } from '$lib/utils/common';
	import { getAddress } from '$lib/utils/get-label';
	import { createSchema, updateSchema } from '$models/schemas/lease.schema.js';
	import type {
		LeaseDto,
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		PaginatedTenantDto,
		PaginatedUnitDto,
	} from '@self/sdk';

	type TPredefinedLease = $$Generic<PredefinedLease | undefined>;
	type TPortfolios = $$Generic<PaginatedPortfolioDto | undefined>;
	type TProperties = $$Generic<PaginatedPropertyDto | undefined>;
	type TUnits = $$Generic<PaginatedUnitDto | undefined>;
	type TTenants = $$Generic<PaginatedTenantDto | undefined>;

	type TLeaseDto = $$Generic<
		TPortfolios extends undefined ? LeaseDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TLeaseDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
		predefined: TPredefinedLease;
		portfolios: TPortfolios;
		properties: TProperties;
		units: TUnits;
		tenants: TTenants;
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TLeaseDto = undefined as TLeaseDto;
	export let predefined: TPredefinedLease = undefined as TPredefinedLease;
	export let portfolios: TPortfolios = undefined as TPortfolios;
	export let properties: TProperties = undefined as TProperties;
	export let units: TUnits = undefined as TUnits;
	export let tenants: TTenants = undefined as TTenants;

	const relationalFields: SelectField<RelOption>[] =
		formType === 'create'
			? [
					new SelectField('portfolioId', {
						label: 'Portfolio',
						required: true,
						value: data?.breadcrumbs?.portfolio.id || predefined?.portfolioId,
						combobox: true,
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
											value: data?.propertyId,
											label: data?.breadcrumbs?.property.label,
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
					new SelectField('tenantId', {
						label: 'Tenant',
						required: true,
						value: data?.breadcrumbs?.tenant.id || predefined?.tenantId,
						combobox: true,
						options:
							formType === 'create'
								? tenants!.results.map((tenant) => ({
										value: tenant.id,
										label: tenant.fullName,
								  }))
								: [
										{
											value: data?.breadcrumbs?.portfolio.id,
											label: data?.breadcrumbs?.portfolio.label!, // temp
										},
								  ],
					}),
			  ]
			: [];

	const basicFields = [
		new Field('monthlyRent', {
			type: 'number',
			required: true,
			value: data?.monthlyRent,
		}),
		new Field('start', {
			type: 'date',
			required: true,
			value: toDateInput(data?.start),
		}),
		new Field('end', {
			type: 'date',
			required: true,
			value: toDateInput(data?.end),
		}),
		new Field('notify', {
			type: 'checkbox',
			value: data?.notify || true,
			autoInit: true,
		}),
		new Field('deactivated', {
			type: 'checkbox',
			value: data?.deactivated || false,
			autoInit: true,
		}),
	];
</script>

<Form2
	schema={formType === 'create' ? createSchema : updateSchema}
	entityTitle="leases"
	{formType}
	{basicFields}
	{relationalFields}
	onCreate={(values) =>
		$page.stuff.api.leases.create({ createLeaseDto: values })}
	onUpdate={(values) =>
		$page.stuff.api.leases.update({
			id: data.id,
			updateLeaseDto: values,
		})}
/>
