<script lang="ts">
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedLease } from '$lib/models/interfaces/predefined.interface';
	import { createSchema, updateSchema } from '$models/schemas/lease.schema';
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
		formType === 'create' && portfolios && properties && units && tenants
			? [
					new SelectField('portfolioId', {
						label: 'Portfolio',
						required: true,
						value: predefined?.portfolioId,
						combobox: true,
						autoInit: true,
						options: portfolios.results.map((portfolio) => ({
							value: portfolio.id,
							label: portfolio.fullName,
						})),
					}),
					new SelectField('propertyId', {
						label: 'Property',
						required: true,
						value: predefined?.propertyId,
						combobox: true,
						autoInit: true,
						options: properties.results.map((property) => ({
							value: property.id,
							label: property.breadcrumbs.property.label,
							meta: { parentId: property.portfolioId },
						})),
					}),
					new SelectField('unitId', {
						label: 'Unit',
						required: true,
						value: predefined?.unitId,
						combobox: true,
						autoInit: true,
						options: units.results.map((unit) => ({
							value: unit.id,
							label: unit.breadcrumbs.unit.label,
							meta: { parentId: unit.propertyId },
						})),
					}),
					new SelectField('tenantId', {
						label: 'Tenant',
						required: true,
						value: predefined?.tenantId,
						combobox: true,
						autoInit: true,
						options: tenants.results.map((tenant) => ({
							value: tenant.id,
							label: tenant.fullName,
						})),
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
			value: data?.start.split('T')[0],
		}),
		new Field('end', {
			type: 'date',
			required: true,
			value: data?.end.split('T')[0],
		}),
		new Field('canPay', {
			label: 'Allow tenant to pay invoices online',
			type: 'checkbox',
			value: data?.canPay ?? true,
			autoInit: true,
		}),
		new Field('notify', {
			label: 'Send payment reminders',
			type: 'checkbox',
			value: data?.notify ?? true,
			autoInit: true,
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={updateSchema}
		entityTitle="leases"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data &&
			$page.stuff.api.leases.update({
				id: data.id,
				updateLeaseDto: values,
			})}
	/>
{:else}
	<Form
		schema={createSchema}
		entityTitle="leases"
		{formType}
		{basicFields}
		{relationalFields}
		onSubmit={(values) =>
			$page.stuff.api.leases.create({ createLeaseDto: values })}
	/>
{/if}
