<script lang="ts">
	import { createApi } from '$api';
	import type {
		LeaseDto,
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		PaginatedTenantDto,
		PaginatedUnitDto,
	} from '$api/openapi';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import {
		portfoliosToOptions,
		propertiesToOptions,
		tenantsToOptions,
		unitsToOptions,
	} from '$lib/components/form/inputs/to-options';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import type { PredefinedLease } from '$lib/models/interfaces/predefined.interface';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import { leaseCreateSchema, leaseUpdateSchema } from '@self/utils';

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
		formType === 'create' && portfolios && tenants
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
					new SelectField('tenantId', {
						label: 'Tenant',
						required: true,
						value: predefined?.tenantId,
						combobox: true,
						autoInit: true,
						options: tenantsToOptions(tenants),
					}),
			  ]
			: [];

	const basicFields = [
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
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
		schema={leaseUpdateSchema}
		entity="lease"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			createApi().leases.update({
				id: data.id,
				updateLeaseDto: values,
			})}
	/>
{:else}
	<Form
		schema={leaseCreateSchema}
		entity="lease"
		{formType}
		{basicFields}
		{relationalFields}
		onSubmit={(values) =>
			createApi().organizations.createLease({
				createLeaseDto: values,
				organizationId: $page.data.user?.role?.organizationId,
			})}
	/>
{/if}
