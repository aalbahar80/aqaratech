<script lang="ts">
	import { createApi } from '$api';
	import type { OrganizationDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field } from '$lib/models/classes/Field.class';
	import { addSuccessToast } from '$lib/stores/toast';
	import { organizationSchema } from '@self/utils';

	type TOrganizationDto = $$Generic<
		// eslint-disable-next-line no-undef
		TOrganizations extends undefined ? OrganizationDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TOrganizationDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TOrganizationDto = undefined as TOrganizationDto;

	const basicFields = [
		new Field('fullName', {
			required: true,
			value: data?.fullName,
			label: 'Organization Name (full)',
		}),
		new Field('label', {
			value: data?.label,
			hint: labelHint,
			label: 'Label (short name)',
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={organizationSchema}
		entity="organization"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data &&
			createApi().organizations.update({
				id: data.id,
				updateOrganizationDto: values,
			})}
		onSuccess={() => {
			addSuccessToast();
			return goto(`/users/${$page.data.user?.id}/roles`);
		}}
	/>
{:else}
	<Form
		schema={organizationSchema}
		entity="organization"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			createApi().organizations.create({
				createOrganizationDto: values,
			})}
		onSuccess={() => {
			addSuccessToast();
			return goto(`/users/${$page.data.user?.id}/roles`);
		}}
	/>
{/if}
