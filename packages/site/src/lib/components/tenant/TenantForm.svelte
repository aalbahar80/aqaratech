<script lang="ts">
	import { page, session } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { toDateInput } from '$lib/utils/common';
	import { schema } from '$models/schemas/tenant.schema.js';
	import type { TenantDto } from '@self/sdk';

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
		new Field('fullName', { required: true, value: data?.fullName }),
		new Field('shortName', {
			value: data?.shortName,
			hint: 'If a short name is provided, it will be used instead of the full name in the UI.',
		}),
		new Field('phone', {
			hint: "Adding a tenant's phone unlocks SMS payment reminders.",
			value: data?.phone,
		}),
		new Field('email', {
			type: 'email',
			hint: "Adding a tenant's email unlocks (1) email payment reminders and (2) tenant portal invitations.",
			value: data?.email,
		}),
		new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			value: toDateInput(data?.dob),
		}),
		new Field('civilid', {
			label: 'Civil ID',
			value: data?.civilid,
		}),
		new Field('passportNum', {
			label: 'Passport Number',
			value: data?.passportNum,
		}),
		new Field('nationality', {
			value: data?.nationality,
		}),
		new Field('residencyNum', {
			label: 'Residency Number',
			value: data?.residencyNum,
		}),
		new Field('residencyEnd', {
			type: 'date',
			label: 'Residency Expiration',
			value: toDateInput(data?.residencyEnd),
		}),
	];
</script>

<Form2
	{schema}
	entityTitle="tenants"
	{formType}
	{basicFields}
	onCreate={(values) =>
		$page.stuff.api.tenants.create({
			createTenantDto: {
				...values,
				organizationId: $session.user?.role.orgId,
			},
		})}
	onUpdate={(values) =>
		$page.stuff.api.tenants.update({
			id: data.id,
			updateTenantDto: values,
		})}
/>
