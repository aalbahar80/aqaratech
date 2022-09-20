<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import { countries } from '$lib/constants/countries';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import { schema } from '$models/schemas/tenant.schema';
	import type { TenantDto } from '$api/openapi';

	type TTenantDto = $$Generic<
		TPortfolios extends undefined ? TenantDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TTenantDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TTenantDto = undefined as TTenantDto;

	const basicFields = [
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
		new Field('fullName', {
			required: true,
			value: data?.fullName,
			label: 'Tenant Name (full)',
		}),
		new Field('label', {
			value: data?.label,
			hint: labelHint,
		}),
		new Field('phone', {
			value: data?.phone,
		}),
		new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			value: data?.dob?.split('T')[0],
		}),
		new Field('civilid', {
			label: 'Civil ID',
			value: data?.civilid,
		}),
		new Field('passportNum', {
			label: 'Passport Number',
			value: data?.passportNum,
		}),
		new SelectField('nationality', {
			value: data?.nationality || null,
			options: countries.map((country) => ({
				label: country.name,
				value: country.alpha3Code,
			})),
			autoInit: true,
			combobox: true,
		}),
		new Field('residencyNum', {
			label: 'Residency Number',
			value: data?.residencyNum,
		}),
		new Field('residencyEnd', {
			type: 'date',
			label: 'Residency Expiration',
			value: data?.residencyEnd?.split('T')[0],
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		{schema}
		entity="tenant"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data && // type hack
			api($page.data.apiConfig).tenants.update({
				id: data.id,
				updateTenantDto: values,
			})}
	/>
{:else}
	<Form
		{schema}
		entity="tenant"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			return api($page.data.apiConfig).tenants.create({
				createTenantDto: values,
			});
		}}
	/>
{/if}
