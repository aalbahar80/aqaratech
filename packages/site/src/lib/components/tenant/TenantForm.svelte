<script lang="ts">
	import { createApi } from '$api';
	import type { TenantDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { countries } from '$lib/constants/countries';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import { tenantCreateSchema as schema } from '@self/utils';

	export let data: TenantDto | undefined = undefined;

	const basicFields = [
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

{#if data}
	<Form
		{schema}
		entity="tenant"
		formType="update"
		{basicFields}
		onSubmit={(values) =>
			createApi().tenants.update({
				id: data.id,
				updateTenantDto: values,
			})}
	/>
{:else}
	<Form
		{schema}
		entity="tenant"
		formType="create"
		{basicFields}
		onSubmit={(values) => {
			return createApi().organizations.createTenant({
				createTenantDto: values,
				organizationId: $page.params.organizationId,
			});
		}}
	/>
{/if}
